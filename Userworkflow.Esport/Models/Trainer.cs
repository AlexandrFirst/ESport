using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkflow.Esport.Models
{
    public enum TrainerStatus {Pending, Active, Stopped}

    public class Trainer
    {
        public Trainer()
        {
            TraineeShedules = new List<TrainerShedule>();
            TrainerSports = new List<TrainerSport>();
            FoodDiets= new List<FoodDiet>();
        }

        public int Id { get; set; }
        public string UserId { get; set; }
        public TrainerStatus Status { get; set; }
        public Guid? PhotoId { get; set; }
        public string Info { get; set; }

        public virtual List<TrainerShedule> TraineeShedules { get; set; }
        public virtual List<TrainerSport> TrainerSports { get; set; }
        public virtual List<FoodDiet> FoodDiets { get; set; }
    }
}
