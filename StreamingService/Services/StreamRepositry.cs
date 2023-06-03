using Kurento.NET;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using StreamingService.DL;
using StreamingService.DL.Models;
using StreamingService.Hubs;
using StreamingService.Models;
using StreamingService.Models.Responses;
using StreamingService.ReadModels;
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
        private readonly IServiceScopeFactory serviceProvider;

        private ConcurrentDictionary<string, StreamProvider> streamProviders = new ConcurrentDictionary<string, StreamProvider>(); //{eventId -> stream}
        private ConcurrentDictionary<Guid, List<string>> userIdStreams = new ConcurrentDictionary<Guid, List<string>>(); //{streamId -> list of connectionsId}
        private ConcurrentDictionary<string, int> connectionUserId = new ConcurrentDictionary<string, int>(); //{connectionId -> userId}

        public StreamRepositry(IServiceScopeFactory serviceProvider)
        {
            this.serviceProvider = serviceProvider;
        }

        public Guid GetStreamIdByConnectionId(string connectionId)  //need to call this function when we join the stean or strat the stream
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

        public void SetStreamByConnectionId(string connectionId, Guid streamId)
        {
            var streamExists = userIdStreams.Keys.Contains(streamId);
            if (!streamExists)
            {
                userIdStreams.TryAdd(streamId, new List<string>() { connectionId });
            }
            else
            {
                var isConnectionExists = userIdStreams.TryGetValue(streamId, out var connections);
                if (!isConnectionExists)
                {
                    throw new Exception($"Stream with id: {streamId} does not exists");
                }

                var isConnectionAdded = connections.Any(x => x == connectionId);
                if (isConnectionAdded) { throw new Exception($"This connection {connectionId} is already at the stream"); }

                connections.Add(connectionId);
            }
        }

        public void RemoveStreamByConnectionId(string connectionId, Guid streamId)
        {
            var streamExists = userIdStreams.Keys.Contains(streamId);
            if (!streamExists)
            {
                throw new Exception($"Unable to remove connection from unexisting stream with id: {streamId}");
            }
            var isConnectionExists = userIdStreams.TryGetValue(streamId, out var connections);
            if (!isConnectionExists)
            {
                throw new Exception("Stream does not exists");
            }

            var connectionDeleted = connections.Remove(connectionId);
            if (!connectionDeleted)
            {
                throw new Exception($"No connection with id {connectionId} is exists");
            }

        }

        public int GetUserIdByConnectionId(string connectionId)
        {
            var userIdExists = connectionUserId.TryGetValue(connectionId, out var userId);
            if (userIdExists) { return userId; }
            else return -1;
        }

        public void SetUserConnectionId(int userId, string connectionId)
        {
            var addedUserConnection = connectionUserId.TryAdd(connectionId, userId);
            if (!addedUserConnection)
            {
                throw new Exception($"Such connection with id {connectionId} is already exists");
            }
        }
        public void RemoveUserConnectionId(string connectionId)
        {
            var removedConnectionsIdStatus = connectionUserId.TryRemove(connectionId, out var removedUserId);
            if (!removedConnectionsIdStatus)
            {
                throw new Exception($"Connection with id {connectionId} to remove is not found");
            }
        }

        public bool IsStreamStarted(string streamId)
        {
            var streamProviderExists = streamProviders.ContainsKey(streamId);
            return streamProviderExists;
        }

        public async Task<PresenterResponse> StartStream(Guid streamId, int organiserId, string sdpOffer)
        {
            using var scope = serviceProvider.CreateScope();
            using var context = scope.ServiceProvider.GetRequiredService<StreamDataContext>();
            var stream = await context.EsStreams.FirstOrDefaultAsync(x => x.Id.Equals(streamId));
            if (stream == null)
            {
                throw new Exception($"No stream with id: {streamId} is found");
            }

            var streamProviderExists = streamProviders.ContainsKey(streamId.ToString());
            if (streamProviderExists)
            {
                throw new Exception($"The stream {streamId.ToString()} for this event {stream.EventId} is already exists");
            }

            var streamProvider = scope.ServiceProvider.GetRequiredService<StreamProvider>();
            streamProvider.setStreamId(streamId);
            var isPresenterStarted = streamProviders.TryAdd(streamId.ToString(), streamProvider);
            if (!isPresenterStarted)
            {
                throw new Exception($"Presenter for stream {streamId.ToString()} with event id: {stream.EventId} is not started; such stream exists");
            }

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
            using var scope = serviceProvider.CreateScope();
            using var context = scope.ServiceProvider.GetRequiredService<StreamDataContext>();
            var stream = await context.EsStreams.FirstOrDefaultAsync(x => x.Id.Equals(streamId));

            var streamProvider = await getStreamProvider(streamId);
            await streamProvider.Stop(userId.ToString());

            if (stream.OrganiserId == userId)
            {
                var isStreamRemoved = streamProviders.TryRemove(streamId.ToString(), out var removedStreamProvider);
                if (!isStreamRemoved)
                {
                    throw new Exception($"stream {streamId.ToString()} with event id {stream.EventId} to stop is not found");
                }
            }
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
            using var scope = serviceProvider.CreateScope();
            using var context = scope.ServiceProvider.GetRequiredService<StreamDataContext>();
            var stream = await context.EsStreams.FirstOrDefaultAsync(x => x.Id.Equals(streamId));

            if (stream == null)
            {
                throw new Exception($"No stream with id {streamId} is found");
            }

            var streamProviderExists = streamProviders.TryGetValue(streamId.ToString(), out var streamProvider);
            if (!streamProviderExists)
            {
                throw new Exception($"Stream {streamId} for event with id {stream.EventId} is not started");
            }

            return streamProvider;
        }

        public async Task<bool> SendMessageToStreamChat(Guid streamId, ChatMessageInfo chatMessageInfo)
        {
            var streamProvider = await getStreamProvider(streamId);
            await streamProvider.SendMessage(chatMessageInfo);
            return true;
        }
    }
}
