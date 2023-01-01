using Kurento.NET;

namespace StreamingService.Models
{
    public class Viewer: User
    {
        public WebRtcEndpoint WebRtcEndpoint { get; set; }
    }
}
