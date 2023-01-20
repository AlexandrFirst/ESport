using Kurento.NET;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using StreamingService.DL;
using StreamingService.DL.Models;
using StreamingService.Models.Responses;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace StreamingService.Services
{
    public class StreamRepositry
    {
        private readonly IServiceProvider serviceProvider;
        
        private ConcurrentDictionary<string, StreamProvider> streamProviders = new ConcurrentDictionary<string, StreamProvider>(); //{eventId -> stream}
        private ConcurrentDictionary<Guid, List<string>> userIdStreams= new ConcurrentDictionary<Guid, List<string>>(); //{streamId -> list of connectionsId}
        private ConcurrentDictionary<string, int> connectionUserId  = new ConcurrentDictionary<string, int>(); //{connectionId -> userId}

        public StreamRepositry(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
        }

        public Guid GetStreamIdByConnectionId(string connectionId) 
        {
            var eventIdConnection = userIdStreams.FirstOrDefault(x => x.Value.Any(p => p.Equals(connectionId)));
            if (eventIdConnection.Equals(default(KeyValuePair<Guid, List<string>>)))
            {
                return Guid.Empty;
            }
            else 
            {
                var eventId = eventIdConnection.Key;
                return eventId;
            }
        }

        public int GetUserIdByConnectionId(string connectionId) 
        {
            var userIdExists = connectionUserId.TryGetValue(connectionId, out var userId);
            if (userIdExists) { return userId; }
            else return -1;
        }

        public bool IsStreamStarted(string eventId)
        {
            var streamProviderExists = streamProviders.ContainsKey(eventId);
            return streamProviderExists;
        }

        public async Task<PresenterResponse> StartStream(Guid streamId, int organiserId, string sdpOffer) 
        {
            using var context = serviceProvider.GetRequiredService<StreamDataContext>();
            var stream = await context.EsStreams.FirstOrDefaultAsync(x => x.Id.Equals(streamId));
            if (stream == null) {
                throw new Exception("No stream is found");
            }

            var streamProviderExists = streamProviders.ContainsKey(stream.EventId);
            if (streamProviderExists) {
                throw new Exception("The stream for this event is already exists");
            }

            var streamProvider = serviceProvider.GetRequiredService<StreamProvider>();
            var presenterResponse = await streamProvider.StartPresenter(organiserId.ToString(), sdpOffer);

            return presenterResponse;
        }

        public async Task<ViewerResponse> JoinStream(Guid streamId, int viewerId, string sdpOffer) 
        {
            var streamProvider = await getStreamProvider(streamId);
            var viewerResponse = await streamProvider.StartViewer(viewerId.ToString(), sdpOffer);
            return viewerResponse;
        }

        public async Task OnIceCandidate(Guid streamId, int userId, IceCandidate iceCandidate) 
        {
            var streamProvider = await getStreamProvider(streamId);
            streamProvider.OnIceCandidate(userId.ToString(), iceCandidate);
        }

        public async Task StopStream(Guid streamId, int userId) 
        {
            var streamProvider = await getStreamProvider(streamId);
            await streamProvider.Stop(userId.ToString());
        }

        public async Task<bool> StartRecording(Guid streamId, int userId) 
        {
            var streamProvider = await getStreamProvider(streamId);
            return await streamProvider.StartRecording(userId.ToString());
        }

        public async Task<bool> StopRecording(Guid streamId, int userId) 
        {
            var streamProvider = await getStreamProvider(streamId);
            return await streamProvider.StopRecording(userId.ToString());
        }

        private async Task<StreamProvider> getStreamProvider(Guid streamId) 
        {
            using var context = serviceProvider.GetRequiredService<StreamDataContext>();
            var stream = await context.EsStreams.FirstOrDefaultAsync(x => x.Id.Equals(streamId));
            if (stream == null)
            {
                throw new Exception("No stream is found");
            }

            var streamProviderExists = streamProviders.TryGetValue(stream.EventId, out var streamProvider);
            if (!streamProviderExists)
            {
                throw new Exception("Stream is not started");
            }

            return streamProvider;
        }
        
    }
}
