using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkflow.Esport.Models
{
    public class AnswerSport
    {
        public int Id { get; set; }
        
        public int AnswerId { get; set; }
        public virtual Answers Answers { get; set; }

        public int SportId { get; set; }
        public virtual Sport Sport { get; set; }

        public bool? IsPositive { get; set; }
    }
}
