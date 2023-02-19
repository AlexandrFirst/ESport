using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkflow.Esport.Models
{
    public class ExerciseSport
    {
        public int Id { get; set; }

        public int SportId { get; set; }
        public virtual Sport Sport { get; set; }

        public int ExerciseId { get; set; }
        public virtual Exercise Exercise { get; set; }
    }
}
