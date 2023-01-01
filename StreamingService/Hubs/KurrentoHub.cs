using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace StreamingService.Hubs
{
    [Authorize]
    public class KurrentoHub : Hub<IKurentoHubClient>
    {

    }
}
