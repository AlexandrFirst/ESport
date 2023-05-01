using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserWorkflow.Esport.Models
{
    public class TrainerRequest
    {
        public TrainerRequest()
        {
            TrainerResponses = new List<TrainerResponse>();
        }

        public int Id { get; set; }
        
        public int TrainerSheduleId { get; set; }
        public virtual TrainerShedule TrainerShedule { get; set; }

        public string Description { get; set; }
        public virtual List<TrainerResponse> TrainerResponses { get; set; }
    }
}
