using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkflow.Esport.Models
{
    public class Traumas
    {
        public Traumas()
        {
            ExerciseTraumas = new List<ExerciseTraumas>();
            AnswerTraumas = new List<AnswerTraumas>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string HealDescription { get; set; }
        
        public int? BodyPartId { get; set; }
        public virtual BodyParts BodyParts { get; set; }

        public virtual List<ExerciseTraumas> ExerciseTraumas { get; set; }
        public virtual List<AnswerTraumas> AnswerTraumas { get; set; }
    }
}
