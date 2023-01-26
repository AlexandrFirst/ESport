using System.Collections.Specialized;

namespace StreamingService.Models.FileUpload
{
    public class UploadProcessingResult
    {
        public bool IsComplete { get; set; }

        public string FileName { get; set; }

        public string LocalFilePath { get; set; }

        public NameValueCollection FileMetadata { get; set; }
    }
}
