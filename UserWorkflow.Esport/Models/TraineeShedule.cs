using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkflow.Esport.Models
{
    public class TraineeShedule
    {
        public TraineeShedule()
        {
            TraineeSheduleExercises = new List<TraineeSheduleTraineeExercise>();
        }

        public int Id { get; set; }
        
        public int TraineeId { get; set; }
        public virtual Trainee Trainee { get; set; }

        public int LessonId { get; set; }
        public virtual Lesson Lesson { get; set; }

        public virtual List<TraineeSheduleTraineeExercise> TraineeSheduleExercises { get; set; }
    }
}
