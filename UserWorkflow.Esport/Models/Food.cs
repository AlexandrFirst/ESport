using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkflow.Esport.Models
{
    public class Food
    {
        public Food()
        {
            FoodDiets = new List<Food_FoodDiet>();
        }

        public int Id { get; set; }
        public float Proteins { get; set; }
        public float Fats { get; set; }
        public float Carbohydrates { get; set; }
        public float Caloric { get; set; }
        public float Water { get; set; }

        public virtual List<Food_FoodDiet> FoodDiets { get; set; }
    }
}
