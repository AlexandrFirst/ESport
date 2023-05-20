using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkflow.Esport.Models
{
    public class Exercise
    {
        public Exercise()
        {
            ExerciseSports = new List<ExerciseSport>();
            ExerciseTraumas = new List<ExerciseTraumas>();
            ExerciseTutorails = new List<ExerciseTutorial>();
            TraineeExercises = new List<TraineeExercise>();
            BodyParts = new List<ExerciseBodyPart>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int? AgeLimit { get; set; }

        public int? ExerciseOwnerId { get; set; }
        public virtual Trainer ExerciseOwner { get; set; }
        
        public bool IsPublic { get; set; }

        public virtual List<ExerciseSport> ExerciseSports { get; set; }
        public virtual List<ExerciseTraumas> ExerciseTraumas { get; set; }
        public virtual List<ExerciseTutorial> ExerciseTutorails { get; set; }
        public virtual List<TraineeExercise> TraineeExercises { get; set; }
        public virtual List<ExerciseBodyPart> BodyParts { get; set; }
    }
}
