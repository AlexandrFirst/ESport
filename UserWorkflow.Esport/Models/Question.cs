using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkflow.Esport.Models
{

    public enum QuestionStage { HistoryTraumas, CurrentTraumas, Timetable, KindOfSports, Address, LessonType, SubQuestion}
    public enum QuestionType { Single, Multiple }
    public enum AnswerType { Quality, Quantity, Categorical, Value, Custom, DateRange }

    public class Question
    {
        public Question()
        {
            Answers = new List<Answers>();
            SubQuestion = new List<Question>();
        }

        public int Id { get; set; }
        public string QuestionText { get; set; }

        public QuestionType QuestionType { get; set; }
        public AnswerType AnswerType { get; set; }
        public QuestionStage QuestionStage { get; set; }

        public int? ParentQuestionId { get; set; }
        public virtual Question ParentQuestion { get; set; }

        public virtual List<Answers> Answers { get; set; }
        public virtual List<Question> SubQuestion { get; set; }

    }
}
