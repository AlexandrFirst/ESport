using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkflow.Esport.Models
{
    public enum QuestionType { Single, Multiple}

    public class Question
    {
        public Question()
        {
            Answers = new List<Answers>();
        }

        public int Id { get; set; }
        public string QuestionText { get; set; }
        public QuestionType QuestionType { get; set; }

        public virtual List<Answers> Answers { get; set; }
    }
}
