using System;

namespace StreamingService.Dto.Stream
{
    public class UpdateStreamEventDto: CreateStreamEventDto
    {
        public Guid Id { get; set; }
    }
}
