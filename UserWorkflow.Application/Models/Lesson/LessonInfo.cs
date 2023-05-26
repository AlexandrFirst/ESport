using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Application.Models.Lesson
{
    public class LessonInfo
    {
        public int LessonId { get; set; }
        public DayOfTheWeek DayOfTheWeek { get; set; }
        public TimeSpan From { get; set; }
        public TimeSpan To { get; set; }
        public int TrainerId { get; set; }
        public string TrainerName { get; set; }
        public List<LessonTraineeInfo> LessonTraineeInfo { get; set; }
    }

    public class LessonTraineeInfo 
    {
        public int TraineeId { get; set; }
        public string TraineeName { get; set;  }
        public bool Me { get; set; }
    }
}
