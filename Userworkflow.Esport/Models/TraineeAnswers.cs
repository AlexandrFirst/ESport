using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;

namespace UserWorkflow.Esport.Models
{
    public class TraineeAnswers
    {
        public int Id { get; set; }

        public int AnswerId { get; set; }
        public virtual Answers Answers { get; set; }

        public int TraineeId { get; set; }
        public virtual Trainee Trainee { get; set; }
    }
}
