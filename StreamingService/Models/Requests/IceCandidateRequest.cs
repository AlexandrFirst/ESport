using Kurento.NET;

namespace StreamingService.Models.Requests
{
    public class IceCandidateRequest: BaseStreamReqeust
    {
        public IceCandidate IceCandidate { get; set; }
    }
}
