using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Application.Models.Gym
{
    public class GymTimeTableByDate 
    {
        public int GymId { get; set; }
        public DateTime DateTime { get; set; }
        public List<DayTimeTable> DayTimeTable { get; set; }
    }

    public class GymTimeTable
    {
        public int GymId { get; set; }
        public DayOfTheWeek DayOfTheWeek { get; set; }
        public List<DayTimeTable> DayTimeTable { get; set; }
    }

    public class DayTimeTable 
    {
        public TimeSpan From { get; set; }
        public TimeSpan To { get; set; }
        public int ShiftId { get; set; }
        public List<TimeTableLesson> TimeTableLessons { get; set; }
        public List<int> TrainerShitIds { get; set; }
    }


    public class TimeTableLesson 
    {
        public int TrainerSheduleId { get; set; }
        public int LessonId { get; set; }
        public int TrainerId { get; set; }
        public string TrainerName { get; set; }
        public LessonType LessonType { get; set; }
        public TimeSpan From { get; set; }
        public TimeSpan To { get; set; }
    }
}
