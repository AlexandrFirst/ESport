using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediaClient.Models
{
    public class UploadResult
    {
        public string Id { get; set; }
        public string FileId { get; set; }
        public string FileName { get; set; }
        public ulong? Size { get; set; }
    }
}
