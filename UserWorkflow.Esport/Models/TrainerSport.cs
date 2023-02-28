using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkflow.Esport.Models
{
    public class TrainerSport
    {
        public int Id { get; set; }

        public int TrainerId { get; set; }
        public virtual Trainer Trainer { get; set; }
        
        public int SportId { get; set; }
        public virtual Sport Sport { get; set; }

        public bool IsConfirmed { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string Level { get; set; }
    }
}
