using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkflow.Esport.Models
{

    public enum LessonType { Group, Individual}

    public class Lesson
    {
        public Lesson()
        {
            TraineeShedules = new List<TraineeShedule>();
            LessonFoodDiets = new List<Lesson_FoodDiet>();
        }

        public int Id { get; set; }
        public LessonType LessonType { get; set; }
        
        public int TrainerSheduleId { get; set; }
        public virtual TrainerShedule TrainerShedule { get; set; }

        public bool OverrideTrainerShedule { get; set; }
        public TimeSpan? FromTime { get; set; }
        public TimeSpan? ToTime { get; set; }
        public int? DayOfTheWeek { get; set; }

        public virtual List<TraineeShedule> TraineeShedules { get; set; }
        public virtual List<Lesson_FoodDiet> LessonFoodDiets { get; set; }
    }
}
