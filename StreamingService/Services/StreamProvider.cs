using Kurento.NET;
using Microsoft.AspNetCore.SignalR;
using StreamingService.Hubs;

namespace StreamingService.Services
{
    public class StreamProvider
    {
        private readonly IHubContext<KurrentoHub, IKurentoHubClient> signalHubInstance;
        private KurentoClient kurentoClient;

        public StreamProvider(IHubContext<KurrentoHub, IKurentoHubClient> signalHubInstance)
        {
            this.signalHubInstance = signalHubInstance;
        }


    }
}
