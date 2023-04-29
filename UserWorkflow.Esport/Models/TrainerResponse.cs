using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserWorkflow.Esport.Models
{
    public class TrainerResponse
    {
        public int Id { get; set; }
        
        public int TrainerRequestId { get; set; }
        public virtual TrainerRequest TrainerRequest { get; set; }

        public int TrainerId { get; set; }
        public virtual Trainer Trainer { get; set; }

        public DateTime ApplicationTime { get; set; }

    }
}
