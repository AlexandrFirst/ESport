using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkflow.Esport.Models
{
    public class FoodDiet
    {
        public FoodDiet()
        {
            LessonFoodDiets = new List<Lesson_FoodDiet>();
            Food_FoodDiets = new List<Food_FoodDiet>();
        }

        public int Id { get; set; }

        public int? TrainerId { get; set; }
        public virtual Trainer Trainer { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }

        public virtual List<Lesson_FoodDiet> LessonFoodDiets { get; set; }
        public virtual List<Food_FoodDiet> Food_FoodDiets { get; set; }
    }
}
