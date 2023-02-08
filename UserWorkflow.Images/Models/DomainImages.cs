using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace UserWorkflow.Images.Models
{
    public abstract class DomainImage
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public Guid ImageId { get; set; }
        public string ContentType { get; set; }
        public byte[] Image { get; set; }
    }
}
