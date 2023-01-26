using Kurento.NET;
using System.Collections.Generic;

namespace StreamingService.Models.Responses
{
    public class PresenterResponse
    {
        public bool IsSuccess { get; set; }
        public string SdpAnswer { get; set; }
        public List<string> Errors { get; set; }
        public WebRtcEndpoint Endpoint { get; set; }
    }
}
