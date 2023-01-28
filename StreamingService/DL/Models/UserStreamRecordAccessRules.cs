using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StreamingService.DL.Models
{
    public enum AccessType { Viewer = 1, Editor = 2 }

    public class UserStreamRecordAccessRules
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid RuleId { get; set; }
        
        public int UserId { get; set; }

        public Guid EsStreamRecordId { get; set; }
        public virtual EsStreamRecords EsStreamRecord { get; set; }

        public AccessType AccessType { get; set; }
        public bool IsAdmin { get; set; }

    }
}
