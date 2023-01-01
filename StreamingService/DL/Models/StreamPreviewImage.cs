using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StreamingService.DL.Models
{
    public class StreamPreviewImage
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid ImageId { get; set; }

        public string ImageLink { get; set; }
        public string PublicId { get; set; }
        public string Metadata { get; set; }

        public virtual EsStream EsStream { get; set; }

    }
}
