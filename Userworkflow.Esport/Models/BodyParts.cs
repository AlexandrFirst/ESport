using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkflow.Esport.Models
{
    public class BodyParts
    {
        public BodyParts()
        {
            AnswerBodyParts = new List<AnswerBodyParts>();
            ExerciseBodyParts = new List<ExerciseBodyPart>();
        }

        public int Id { get; set; } 
        public string Name { get; set; }
        public Guid? ImageId { get; set; }
        public string Description { get; set; }

        public virtual List<AnswerBodyParts> AnswerBodyParts { get; set; }
        public virtual List<ExerciseBodyPart> ExerciseBodyParts { get; set; }
    }
}
