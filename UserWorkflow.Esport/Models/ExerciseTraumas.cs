using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkflow.Esport.Models
{
    public class ExerciseTraumas
    {
        public int Id { get; set; }

        public int TraumaId { get; set; }
        public virtual Traumas Traumas { get; set; }

        public int ExerciseId { get; set; }
        public virtual Exercise Exercise { get;set; }
    }
}
