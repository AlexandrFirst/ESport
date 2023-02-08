using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkflow.Esport.Models
{
    public class Trainee
    {
        public Trainee()
        {
            TraineeAnswers= new List<TraineeAnswers>();
            TraineeShedules = new List<TraineeShedule>();
        }

        public int Id { get; set; }
        public int UserId { get; set; }
        public string Info { get; set; }
        public Guid? PhotoId { get; set; }

        public virtual List<TraineeAnswers> TraineeAnswers { get; set; }
        public virtual List<TraineeShedule> TraineeShedules { get; set; }
    }
}
