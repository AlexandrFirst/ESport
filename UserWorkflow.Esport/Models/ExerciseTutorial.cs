using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkflow.Esport.Models
{
    public class ExerciseTutorial
    {
        public int Id { get; set; }

        public int? ExerciseId { get; set; }
        public virtual Exercise Exercise { get; set; }

        public string Link { get; set; }
        public string PublicId { get; set; }
    }
}
