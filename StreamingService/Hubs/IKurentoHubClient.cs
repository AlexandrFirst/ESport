using StreamingService.Models;
using System.Threading.Tasks;

namespace StreamingService.Hubs
{
    public interface IKurentoHubClient
    {
        public Task Send(ClientMessageBody clientMessageBody);
    }
}
