using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkflow.Esport.Models
{
    public class AnswerTraumas
    {
        public int Id { get; set; }
        
        public int TraumaId { get; set; }
        public virtual Traumas Traumas { get; set; }

        public int AnswerId { get; set; }
        public virtual Answers Answers { get; set; }
    }
}
