using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkflow.Esport.Models
{
    public class GymShift
    {
        public GymShift()
        {
            TrainerShedules = new List<TrainerShedule>();
        }

        public int Id { get; set; }
        
        public int GymId { get; set; }
        public virtual Gym Gym { get; set; }

        public TimeSpan FromTime { get; set; }
        public TimeSpan ToTime { get; set; }
        public int DayOfTheWeeks { get; set; }

        public virtual List<TrainerShedule> TrainerShedules { get; set; }
    }
}
