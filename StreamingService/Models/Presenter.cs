using Kurento.NET;

namespace StreamingService.Models
{
    public class Presenter: Viewer
    {
        public MediaPipeline MediaPipeline { get; set; }
        public WebRtcEndpoint WebRtcEndpoiont { get; set; }
    }
}
