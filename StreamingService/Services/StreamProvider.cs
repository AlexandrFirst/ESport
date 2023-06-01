using Kurento.NET;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection;
using StreamingService.Hubs;
using System;
using System.Collections.Concurrent;
using StreamingService.Models;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using System.Linq;
using Newtonsoft.Json;
using StreamingService.Models.Responses;
using StreamingService.Models.Options;
using Microsoft.Extensions.Options;
using System.Threading;
using StreamingService.ReadModels;

namespace StreamingService.Services
{
    public class StreamProvider
    {
        private readonly IServiceScopeFactory serviceProvider;
        private readonly ILogger<StreamProvider> logger;
        private readonly IRecordService recordService;
        private readonly KurrentoOptions kurrentoOptions;

        private KurentoClient kurentoClient;

        private Presenter presenter { get; set; }
        private List<Viewer> viewers { get; set; }
        private ConcurrentDictionary<string, ConcurrentQueue<Candidate>> candidateQueue { get; set; }

        private CancellationTokenSource cts;

        private bool isStreamRecording = false;

        private Guid streamId = Guid.Empty;
        public void setStreamId(Guid streamId) { this.streamId = streamId; }

        public StreamProvider(IServiceScopeFactory serviceProvider, 
            ILogger<StreamProvider> _logger, IOptions<KurrentoOptions> kurrentoOptions, IRecordService recordService)
        {
            this.serviceProvider = serviceProvider;
            logger = _logger;
            this.recordService = recordService;
            this.kurrentoOptions = kurrentoOptions.Value;

            viewers = new List<Viewer>();
            candidateQueue = new ConcurrentDictionary<string, ConcurrentQueue<Candidate>>();
            cts = new CancellationTokenSource();
        }

        public async Task Stop(string userId)
        {
            logger.LogInformation($"Stopping user translation with id: {userId} ");

            if (presenter != null && presenter.UserId.ToString().Equals(userId))
            {
                using var scope = serviceProvider.CreateScope();
                var signalHubInstance = scope.ServiceProvider.GetRequiredService<IHubContext<KurrentoHub, IKurentoHubClient>>();

                foreach (var i in viewers)
                {
                    await signalHubInstance.Clients.Group(i.UserId.ToString()).Send(new ClientMessageBody()
                    {
                        Id = "stopCommunication"
                    });
                }
                await presenter.MediaPipeline.ReleaseAsync();
                cts.Cancel();
                isStreamRecording = false;
                presenter = null;
                viewers.Clear();
            }
            else if (viewers.Any(x => x.UserId.ToString().Equals(userId)))
            {
                var viewer = viewers.First(x => x.UserId.ToString().Equals(userId));
                await viewer.WebRtcEndpoint.ReleaseAsync();
                viewers.Remove(viewer);
            }

            clearCandidateQueue(userId.ToString());

            if (viewers.Count < 1 && presenter == null)
            {
                kurentoClient = null;
            }
        }


        public async Task<PresenterResponse> StartPresenter(string userId, string sdpOffer)
        {
            logger.LogInformation($"Starting presenter with connection id: {userId}");

            //clearCandidateQueue(userId);

            if (presenter != null)
            {
                await Stop(userId);
                return new PresenterResponse()
                {
                    IsSuccess = false,
                    Errors = new List<string>() { "Another user is currently acting as presenter. Try again later ..." }
                };
            }

            if (!candidateQueue.ContainsKey(userId))
                candidateQueue.TryAdd(userId, new ConcurrentQueue<Candidate>());


            presenter = new Presenter()
            {
                UserId = int.Parse(userId),
                MediaPipeline = null,
                WebRtcEndpoint = null
            };

            kurentoClient = getKurentoClient();

            _ = Task.Run(async () =>
            {
                while (!cts.IsCancellationRequested)
                {
                    if (kurentoClient != null)
                    {
                        var response = await kurentoClient.SendAsync("ping", new
                        {
                            interval = 1000
                        });
                        var res = response.Result.GetValue("value");
                        //Console.WriteLine("Result of ping: " + res + " " + DateTime.Now);
                        Thread.Sleep(500);
                    }
                    else
                    {
                        break;
                    }
                }
            }, cts.Token);


            if (kurentoClient == null)
            {
                await Stop(userId);
                return new PresenterResponse() { IsSuccess = false, Errors = new List<string>() { "Error while creating kurento client" } };
            }

            try
            {
                var mediaPipeline = await kurentoClient.CreateAsync(new MediaPipeline());

                var webRtcEndPoint = await kurentoClient.CreateAsync(new WebRtcEndpoint(mediaPipeline, recvonly: false, sendonly: true, useDataChannels: true));


                await webRtcEndPoint.SetMinOutputBitrateAsync(30);
                await webRtcEndPoint.SetMaxOutputBitrateAsync(100);

                await webRtcEndPoint.SetMinVideoSendBandwidthAsync(30);
                await webRtcEndPoint.SetMaxVideoSendBandwidthAsync(100);


                while (candidateQueue[userId].TryDequeue(out var candidate))
                {
                    await webRtcEndPoint.AddIceCandidateAsync(candidate.IceCandidate);
                }

                webRtcEndPoint.IceCandidateFound += (IceCandidateFoundEventArgs obj) =>
                {
                    using var scope = serviceProvider.CreateScope();
                    var signalHubInstance = scope.ServiceProvider.GetRequiredService<IHubContext<KurrentoHub, IKurentoHubClient>>();

                    var cadidate = obj.candidate;
                    signalHubInstance.Clients.Group(userId).Send(new ClientMessageBody()
                    {
                        Id = "iceCandidate",
                        Body = JsonConvert.SerializeObject(cadidate)
                    });
                };

                Console.WriteLine("Processing presenter offer");
                var sdpAnswer = await webRtcEndPoint.ProcessOfferAsync(sdpOffer);
                presenter.MediaPipeline = mediaPipeline;
                presenter.WebRtcEndpoint = webRtcEndPoint;


                Console.WriteLine("Processing presenter answer");
                return new PresenterResponse() { IsSuccess = true, SdpAnswer = sdpAnswer, Endpoint = webRtcEndPoint };

            }
            catch (Exception ex)
            {
                string message = ex.Message + " | " + ex.InnerException.Message;
                logger.LogError(message);

                await Stop(userId);
                return new PresenterResponse() { IsSuccess = false, Errors = new List<string>() { message } };
            }

        }

        public async Task<bool> StartRecording(string userId)
        {
            if (!checkAccessRules(userId)) { return false; }

            var fileGuid = Guid.NewGuid().ToString();

            string fileName = $"{fileGuid}.WEBM";

            string recordUri = kurrentoOptions.RecordUri + fileName;

            RecorderEndpoint recorderEndpoint = await kurentoClient.CreateAsync(new RecorderEndpoint(presenter.MediaPipeline, recordUri, MediaProfileSpecType.WEBM));

            //await recorderEndpoint.ConnectAsync(presenter.WebRtcEndpoint);
            await presenter.WebRtcEndpoint.ConnectAsync(recorderEndpoint);

            recorderEndpoint.Recording += (RecordingEventArgs obj) =>
            {
                logger.LogInformation("Recording started: " + obj.timestamp);
            };

            recorderEndpoint.Stopped += async (StoppedEventArgs obj) =>
            {
                await recordService.SendRecordForUploading(new Models.Record.RecordUploadOption()
                {
                    FileId = Guid.Parse(fileGuid),
                    StreamId = streamId
                });
            };

            presenter.RecorderEndpoint = recorderEndpoint;

            await presenter.RecorderEndpoint.RecordAsync();

            isStreamRecording = true;

            return true;

        }

        public async Task<bool> StopRecording(string userId)
        {
            if (isStreamRecording == false)
            {
                throw new Exception("Recording is not started");
            }

            if (!checkAccessRules(userId)) { return false; }

            if (presenter.RecorderEndpoint == null)
            {
                throw new Exception("Presentor doesn't have record endpoint");
            }

            await presenter.RecorderEndpoint.StopAsync();
            isStreamRecording = false;
            return true;
        }

        private bool checkAccessRules(string userId)
        {
            if (kurentoClient == null)
            {
                return false;
                //throw new Exception("No kurrento client is found");
            }

            if (presenter == null)
            {
                return false;
                //throw new Exception("No presenter is present");
            }

            if (!presenter.UserId.ToString().Equals(userId))
            {
                return false;
                //throw new Exception("Only presenter can record");
            }
            return true;
        }

        public async Task<ViewerResponse> StartViewer(string userId, string sdpOffer)
        {
            // clearCandidateQueue(userId);
            if (presenter == null)
            {
                await Stop(userId);
                return new ViewerResponse()
                {
                    IsSuccess = false,
                    Errors = new List<string>() { "No presenter yeat available..." }
                };
            }

            var webRtcEndPoint = await kurentoClient.CreateAsync(new WebRtcEndpoint(presenter.MediaPipeline, recvonly: true, sendonly: false, useDataChannels: true));

            await webRtcEndPoint.SetMinVideoRecvBandwidthAsync(30);
            await webRtcEndPoint.SetMaxVideoRecvBandwidthAsync(100);

            if (!candidateQueue.ContainsKey(userId))
                candidateQueue.TryAdd(userId, new ConcurrentQueue<Candidate>());

            var viewer = new Viewer()
            {
                UserId = int.Parse(userId),
                WebRtcEndpoint = webRtcEndPoint,
            };

            viewers.Add(viewer);

            while (candidateQueue[userId].TryDequeue(out var candidate))
            {
                await webRtcEndPoint.AddIceCandidateAsync(candidate.IceCandidate);
            }

            webRtcEndPoint.IceCandidateFound += (IceCandidateFoundEventArgs obj) =>
            {
                using var scope = serviceProvider.CreateScope();
                var signalHubInstance = scope.ServiceProvider.GetRequiredService<IHubContext<KurrentoHub, IKurentoHubClient>>();

                var cadidate = obj.candidate;
                signalHubInstance.Clients.Group(userId).Send(new ClientMessageBody()
                {
                    Id = "iceCandidate",
                    Body = JsonConvert.SerializeObject(cadidate)
                });
            };

            webRtcEndPoint.DataChannelClose += (DataChannelCloseEventArgs obj) =>
            {
                logger.LogError($"Data channel close with client id: {userId} happend; {obj.ToString()} ");
            };

            webRtcEndPoint.ConnectionStateChanged += (ConnectionStateChangedEventArgs obj) =>
            {
                logger.LogError($"ConnectionStateChanged with client id: {userId} happend; {obj.ToString()} ");
            };


            webRtcEndPoint.Error += (ErrorEventArgs args) =>
            {
                logger.LogError($"Error with client id: {userId} happend; {args.description} {args.errorCode} {args.type}");
            };

            webRtcEndPoint.MediaSessionTerminated += (MediaSessionTerminatedEventArgs args) =>
            {
                logger.LogError($"MediaSessionTerminated with client id: {userId} happend; {args.type}");
            };

            webRtcEndPoint.OnDataChannelClosed += (OnDataChannelClosedEventArgs args) =>
            {
                logger.LogError($"OnDataChannelClosed with client id: {userId} happend; {args.type}; channel id: {args.channelId}");
            };

            webRtcEndPoint.ElementDisconnected += (ElementDisconnectedEventArgs obj) =>
            {
                logger.LogError($"Disconnected with client id: {userId} happend; {obj.ToString()} ");
            };

            var sdpAnswer = await webRtcEndPoint.ProcessOfferAsync(sdpOffer);

            await presenter.WebRtcEndpoint.ConnectAsync(webRtcEndPoint);

            return new ViewerResponse() { IsSuccess = true, SdpAnswer = sdpAnswer, Endpoint = webRtcEndPoint };

        }

        public void OnIceCandidate(string userId, IceCandidate _candidate)
        {
            if (presenter != null &&
                presenter.UserId.ToString().Equals(userId) &&
                presenter.WebRtcEndpoint != null)
            {
                logger.LogInformation("Sending presenter candidate to user with id: " + userId);
                presenter.WebRtcEndpoint.AddIceCandidateAsync(_candidate);
            }
            else if (viewers.Any(x => x.UserId.ToString().Equals(userId)) &&
                viewers.First(x => x.UserId.ToString().Equals(userId)).WebRtcEndpoint != null)
            {
                logger.LogInformation("Sending viewer candidate to user: " + userId);
                var viewer = viewers.First(x => x.UserId.ToString().Equals(userId));
                viewer.WebRtcEndpoint.AddIceCandidateAsync(_candidate);
            }
            else
            {
                logger.LogInformation("Queueing candidate for user: " + userId);

                var connectionExists = candidateQueue.ContainsKey(userId);
                if (!connectionExists)
                    candidateQueue.TryAdd(userId, new ConcurrentQueue<Candidate>());

                candidateQueue[userId].Enqueue(new Candidate()
                {
                    IceCandidate = _candidate,
                    UserId = int.Parse(userId),
                });
            }
        }

        public async Task SendMessage(ChatMessageInfo chatMessageInfo)
        {
            using var scope = serviceProvider.CreateScope();
            var signalHubInstance = scope.ServiceProvider.GetRequiredService<IHubContext<KurrentoHub, IKurentoHubClient>>();

            var msg = new ChatMessageResponse()
            {
                Message = $"{chatMessageInfo.UserName} ({chatMessageInfo.UserId}):{chatMessageInfo.Message}",
                IsSuccess = true
            };

            foreach (var viewer in viewers)
            {
                await signalHubInstance.Clients.Group(viewer.UserId.ToString()).Send(new ClientMessageBody()
                {
                    Id = MessageType.ChatMessage.ToString(),
                    Body = JsonConvert.SerializeObject(msg)
                });
            }

            await signalHubInstance.Clients.Group(presenter.UserId.ToString()).Send(new ClientMessageBody()
            {
                Id = MessageType.ChatMessage.ToString(),
                Body = JsonConvert.SerializeObject(msg)
            });
        }

        private KurentoClient getKurentoClient()
        {
            if (kurentoClient != null)
            {
                return kurentoClient;
            }

            try
            {
                logger.LogDebug("Connecting to kurrento media server: " + kurrentoOptions.WsUri);
                var _kurentoClient = new KurentoClient(kurrentoOptions.WsUri, logger) { };
                return _kurentoClient;
            }
            catch (Exception ex)
            {
                logger.LogError($"Could not find media server at address {kurrentoOptions.WsUri}; error: {ex.Message}");
                return null;
            }

        }

        private void clearCandidateQueue(string userId)
        {
            logger.LogInformation("Clearing candidates queue for user: " + userId);
            candidateQueue.TryRemove(userId, out var value);
        }

    }
}
