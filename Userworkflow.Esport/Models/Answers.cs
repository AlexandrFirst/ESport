using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkflow.Esport.Models
{
    public class Answers
    {
        public Answers()
        {
            AnswerBodyParts = new List<AnswerBodyParts>();
            AnswerSports = new List<AnswerSport>();
            AnswerTraumas = new List<AnswerTraumas>();
            TraineeAnswers = new List<TraineeAnswers>();
        }

        public int Id { get; set; }
        public string Answer { get; set; }

        public int QuestionId { get; set; }
        public virtual Question Question { get; set; }

        public virtual List<AnswerBodyParts> AnswerBodyParts { get; set; }
        public virtual List<AnswerSport> AnswerSports { get; set; }
        public virtual List<AnswerTraumas> AnswerTraumas { get; set; }
        public virtual List<TraineeAnswers> TraineeAnswers { get; set; }
    }
}
