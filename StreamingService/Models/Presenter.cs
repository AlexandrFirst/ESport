using Kurento.NET;

namespace StreamingService.Models
{
    public class Presenter: Viewer
    {
        public MediaPipeline MediaPipeline { get; set; }
        public RecorderEndpoint RecorderEndpoint { get; set; }
    }
}
