using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkflow.Esport.Models
{
    public class AnswerBodyParts
    {
        public int Id { get; set; }
        
        public int BodyPartId { get; set; }
        public virtual BodyParts BodyParts { get; set; }

        public int AnswerId { get; set; }
        public virtual Answers Answers { get; set; }

        public bool? IsPositive { get; set; }
    }
}
