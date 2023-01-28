using Kurento.NET;

namespace StreamingService.Models
{
    public class Candidate: User
    {
        public IceCandidate IceCandidate { get; set; }
    }
}
