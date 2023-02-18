using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkflow.Esport.Models
{

    public enum ExerciseType { SelfAdded, TrainerAdded }
    public enum ExerciseStatus { Active, Stopped, Rejected, Restarted }

    public class TraineeExercise
    {
        public TraineeExercise()
        {
            TraineeSheduleExercises = new List<TraineeSheduleTraineeExercise>();
        }

        public int Id { get; set; }
        
        public int ExerciseId { get; set; }
        public virtual Exercise Exercise { get; set; }

        public string DescriptionOverride { get; set; }
        public ExerciseType ExerciseType { get; set; }
        public bool IsRecommended { get; set; }
        public ExerciseStatus ExerciseStatus { get; set; }
        public string StatusReason { get; set; }

        public virtual List<TraineeSheduleTraineeExercise> TraineeSheduleExercises { get; set; }
    }
}
