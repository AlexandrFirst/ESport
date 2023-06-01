using System;

namespace StreamingService.Dto.Records
{
    public class RecordListingResponse
    {
        public string PublicId { get; set; }
        public DateTime RecordTime { get; set; }
        public string FileName { get; set; }
        public string RecordId { get; set; }
    }
}
