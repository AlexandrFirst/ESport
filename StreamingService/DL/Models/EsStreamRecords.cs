using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StreamingService.DL.Models
{
    public enum AccessMode { All = 1, OnlyParticipants = 2, LinkedUsers = 4 }
    public enum RecordStatus { Active = 1, Review = 2 }

    public class EsStreamRecords
    {
        public EsStreamRecords()
        {
            LinkedUsers = new HashSet<UserStreamRecordAccessRules>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        
        public string Name { get; set; }
        
        public int ByteSize { get; set; }
        
        public AccessMode AccessMode { get; set; }

        public Guid EsStreamId { get; set; }
        public virtual EsStream Stream { get; set; }
        
        public DateTime CreationDate { get; set; }
        
        public RecordStatus RecordStatus { get; set; }

        public virtual ICollection<UserStreamRecordAccessRules> LinkedUsers { get; set; }

    }
}
