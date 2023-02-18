using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkflow.Esport.Models
{
    public class Food_FoodDiet
    {
        public int Id { get; set; }

        public int FoodId { get; set; }
        public virtual Food Food { get; set; }

        public int DietId { get; set; }
        public virtual FoodDiet FoodDiet { get; set; }

        public string Description { get; set; }
        public float Amount { get; set; }
    }
}
