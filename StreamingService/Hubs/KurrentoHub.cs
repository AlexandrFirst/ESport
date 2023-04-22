using Castle.Core.Logging;
using Kurento.NET;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using StreamingService.Models;
using StreamingService.Models.Requests;
using StreamingService.Models.Responses;
using StreamingService.ReadModels;
using StreamingService.Services;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace StreamingService.Hubs
{
    [Authorize(AuthenticationSchemes = "WS")]
    public class KurrentoHub : Hub<IKurentoHubClient>
    {
        private readonly StreamRepositry streamRepositry;
        private readonly ILogger<KurrentoHub> logger;

        public KurrentoHub(StreamRepositry streamRepositry, ILogger<KurrentoHub> logger)
        {
            this.streamRepositry = streamRepositry;
            this.logger = logger;
        }

        public async Task Error(ServerMessageBody messageBody)
        {
            logger.LogError($"Error: (session id: {Context.ConnectionId}) {messageBody.Body}");
            var request = messageBody.GetMessageBody<StopRequest>();

            var userIdClaim = Context.User.Claims.FirstOrDefault(x => x.Type == "Id");
            if (userIdClaim == null)
            {
                await Clients.Group(userIdClaim.Value).Send(new ClientMessageBody()
                {
                    Id = userIdClaim.Value,
                    Body = "Cannot stop translation. Reload the page"
                });
                return;
            }

            await streamRepositry.StopStream(request.StreamId, int.Parse(userIdClaim.Value));
        }

        public async Task Close(ServerMessageBody messageBody)
        {
            logger.LogError($"Session id: {Context.ConnectionId} closed");
            var userIdClaim = Context.User.Claims.FirstOrDefault(x => x.Type == "Id");
            var request = messageBody.GetMessageBody<StopRequest>();

            if (userIdClaim == null)
            {
                await Clients.Group(userIdClaim.Value).Send(new ClientMessageBody()
                {
                    Id = userIdClaim.Value,
                    Body = "Cannot stop translation. Reload the page"
                });
                return;
            }

            await streamRepositry.StopStream(request.StreamId, int.Parse(userIdClaim.Value));
        }

        public async Task Message(MessageType messageType, ServerMessageBody messageBody)
        {
            var userIdClaim = Context.User.Claims.FirstOrDefault(x => x.Type == "Id");
           
            if (userIdClaim == null)
            {
                await Clients.Client(Context.ConnectionId).Send(new ClientMessageBody()
                {
                    Id = userIdClaim.Value,
                    Body = "Cannot stop translation. Reload the page"
                });
                return;
            }
            var userId = int.Parse(userIdClaim.Value);

            try
            {
                Console.WriteLine($"Sending request {messageType.ToString()} from user" + userId.ToString() + "| " + messageBody ?? string.Empty);
                switch (messageType)
                {
                    case MessageType.Presenter:
                        var presentorRequest = messageBody.GetMessageBody<PresenterRequest>();
                        Console.WriteLine("Sending presenter request from user" + userId.ToString() + "| " + messageBody);

                        var presenterResponse = await streamRepositry.StartStream(presentorRequest.StreamId, userId, presentorRequest.SdpOffer);
                        if (!presenterResponse.IsSuccess)
                        {
                            Console.WriteLine("Sending bad presenter response to user" + userId.ToString());
                            await Clients.Group(userId.ToString()).Send(new ClientMessageBody()
                            {
                                Id = "presenterResponse",
                                Body = JsonConvert.SerializeObject(new { message = "rejected", errors = presenterResponse.Errors })
                            });
                        }
                        else
                        {
                            streamRepositry.SetStreamByConnectionId(Context.ConnectionId, presentorRequest.StreamId);
                            Console.WriteLine("Sending good presenter response to user" + userId.ToString());
                            await Clients.Group(userId.ToString()).Send(new ClientMessageBody()
                            {
                                Id = "presenterResponse",
                                Body = JsonConvert.SerializeObject(new { message = "accepted", sdpAnswer = presenterResponse.SdpAnswer })
                            });
                            await presenterResponse.Endpoint.GatherCandidatesAsync();
                        }
                        break;
                    case MessageType.Viewer:
                        var viewerRequest = messageBody.GetMessageBody<ViewerRequest>();
                        var viewerResponse = await streamRepositry.JoinStream(viewerRequest.StreamId, userId, viewerRequest.SdpOffer);

                        if (!viewerResponse.IsSuccess)
                        {

                            await Clients.Group(userId.ToString()).Send(new ClientMessageBody()
                            {
                                Id = "viewerResponse",
                                Body = JsonConvert.SerializeObject(new { message = "rejected", errors = viewerResponse.Errors })
                            });
                        }
                        else
                        {
                            streamRepositry.SetStreamByConnectionId(Context.ConnectionId, viewerRequest.StreamId);
                            await Clients.Group(userId.ToString()).Send(new ClientMessageBody()
                            {
                                Id = "viewerResponse",
                                Body = JsonConvert.SerializeObject(new { message = "accepted", sdpAnswer = viewerResponse.SdpAnswer })
                            });
                            await viewerResponse.Endpoint.GatherCandidatesAsync();
                        }
                        break;
                    case MessageType.Stop:
                        var request = messageBody.GetMessageBody<StopRequest>();
                        await streamRepositry.StopStream(request.StreamId, userId);
                        streamRepositry.RemoveUserConnectionId(Context.ConnectionId);
                        streamRepositry.RemoveStreamByConnectionId(Context.ConnectionId, request.StreamId);
                        break;
                    case MessageType.onIceCandidate:
                        var onIceCandidateRequest = messageBody.GetMessageBody<IceCandidateRequest>();
                        await streamRepositry.OnIceCandidate(onIceCandidateRequest.StreamId, userId, onIceCandidateRequest.IceCandidate);
                        break;
                    case MessageType.StartRecording:
                        var startRecordReqeust = messageBody.GetMessageBody<BaseStreamReqeust>();
                        var isRecordedStarted = await streamRepositry.StartRecording(startRecordReqeust.StreamId, userId);
                        if (!isRecordedStarted) { await SendErrorResponse("Recording is not started", userId.ToString()); }
                        break;
                    case MessageType.StopRecording:
                        var stopRecordReqeust = messageBody.GetMessageBody<BaseStreamReqeust>();
                        var isRecordedStopped = await streamRepositry.StopRecording(stopRecordReqeust.StreamId, userId);
                        if (!isRecordedStopped) { await SendErrorResponse("Recording is not stopped", userId.ToString()); }
                        break;
                    case MessageType.ChatMessage:
                        var messageRequestBody = messageBody.GetMessageBody<ChatMessageRequest>();

                        var isStreamGuidCorret = Guid.TryParse(messageRequestBody.StreamId, out var streamId);

                        var userNameClaim = Context.User.Claims.FirstOrDefault(x => x.Type == "Name");
                        string userName = "Uknown";
                        if (userNameClaim != null) 
                        {
                            userName = userNameClaim.Value;
                        }

                        var isMessageSent = await streamRepositry.SendMessageToStreamChat(streamId, new ReadModels.ChatMessageInfo()
                        {
                            Message = messageRequestBody.Message,
                            UserId = userId,
                            UserName = userName
                        });
                        if (!isMessageSent) 
                        {
                            var msg = new ChatMessageResponse() { Message = $"Unable to send message: {messageRequestBody.Message}", IsSuccess = false };
                            await Clients.Client(Context.ConnectionId).Send(new ClientMessageBody()
                            {
                                Id = MessageType.ChatMessage.ToString(),
                                Body = JsonConvert.SerializeObject(msg)
                            });
                        }

                        break;
                    default:
                        await SendErrorResponse(messageBody.Body, userId.ToString());
                        break;
                }
            }
            catch (Exception ex)
            {
                await SendErrorResponse(ex.Message, userId.ToString());
            }
        }

        private async Task SendErrorResponse(string message, string userId)
        {
            await Clients.Group(userId.ToString()).Send(new ClientMessageBody()
            {
                Id = "error",
                Body = JsonConvert.SerializeObject(new { message = $"invalid message: {message}" })
            });
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var connectionId = Context.ConnectionId;
            var streamId = streamRepositry.GetStreamIdByConnectionId(connectionId);
            var userId = streamRepositry.GetUserIdByConnectionId(connectionId);


            if (streamId.Equals(Guid.Empty) || userId == -1)
            {
                return;
            }

            logger.LogError($"{userId} is closing its connection");

            await streamRepositry.StopStream(streamId, userId);

            streamRepositry.RemoveUserConnectionId(Context.ConnectionId);
            streamRepositry.RemoveStreamByConnectionId(Context.ConnectionId, streamId);

            await Groups.RemoveFromGroupAsync(connectionId, userId.ToString());

            await base.OnDisconnectedAsync(exception);
        }

        public override async Task OnConnectedAsync()
        {
            var userIdClaim = Context.User.Claims.FirstOrDefault(x => x.Type == "Id");
            var connectionId = Context.ConnectionId;

            if (userIdClaim == null)
            {
                logger.LogError("No userIdClaimn is found; connectionId: " + connectionId);
            }

            var userId = userIdClaim.Value;

            streamRepositry.SetUserConnectionId(int.Parse(userId), connectionId);

            await Groups.AddToGroupAsync(connectionId, userId.ToString());

            logger.LogDebug($"User id: {userId} with connectionId: {connectionId} is connected");

            await base.OnConnectedAsync();
        }
    }
}
