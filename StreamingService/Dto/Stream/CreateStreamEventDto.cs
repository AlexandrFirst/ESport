using System;

namespace StreamingService.Dto.Stream
{
    public class CreateStreamEventDto
    {
        public Guid EventId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid? PreviewImageId { get; set; }

        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
    }
}
