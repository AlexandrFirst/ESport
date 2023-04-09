using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkflow.Esport.Models
{
    public class ExerciseBodyPart
    {
        public int Id { get; set; }

        public int ExerciseId { get; set; }
        public virtual Exercise Exercise { get; set; }

        public int BodyPartId { get; set; }
        public virtual BodyParts BodyParts { get; set; }

        public string Description { get; set; }
    }
}
