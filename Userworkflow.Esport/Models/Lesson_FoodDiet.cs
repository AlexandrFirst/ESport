using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkflow.Esport.Models
{
    public class Lesson_FoodDiet
    {
        public int Id { get; set; }
        
        public int LessonId { get; set; }
        public virtual Lesson Lesson { get; set; }

        public int FoodDietId { get; set; }
        public virtual FoodDiet FoodDiet { get; set; }
    }
}
