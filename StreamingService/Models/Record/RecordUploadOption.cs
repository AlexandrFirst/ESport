using System;

namespace StreamingService.Models.Record
{
    public class RecordUploadOption
    {
        public Guid FileId { get; set; }
        public Guid StreamId { get; set; }
        public Guid RecordId { get; set; } = Guid.Empty;
    }
}
