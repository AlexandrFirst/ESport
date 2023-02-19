using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkflow.Esport.Models
{
    public class TraineeSheduleTraineeExercise
    {
        public int Id { get; set; }

        public int TraineeSheduleId { get; set; }
        public virtual TraineeShedule TraineeShedule { get; set;}

        public int TraineeExerciseId { get; set; }
        public virtual TraineeExercise TraineeExercise { get; set; }

        public int Order { get; set; }
        public string Notes { get; set; }
    }
}
