using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StreamingService.DL.Models
{
    public class EsStream
    {
        public EsStream()
        {
            StreamRecords = new HashSet<EsStreamRecords>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public int OrganiserId { get; set; }
        public Guid EventId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ConnectionId { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }

        public Guid? PreviewImageId { get; set; }
        public virtual StreamPreviewImage PreviewImage { get; set; }

        public virtual ICollection<EsStreamRecords> StreamRecords { get; set; }
    }
}
