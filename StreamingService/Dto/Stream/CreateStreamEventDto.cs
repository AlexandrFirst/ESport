using System;

namespace StreamingService.Dto.Stream
{
    public class CreateStreamEventDto
    {
        public string EventId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string? PreviewImageId { get; set; }

        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
    }
}
