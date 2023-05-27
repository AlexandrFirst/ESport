using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Models.TimeTable;

namespace UserWorkflow.Application.Models.Lesson
{
    public class LessonRecomendation
    {
        public int LessonId { get; set; }
        public List<ReadSportInfo> SportInfo { get; set; }
        public int TrainerId { get; set; }
        public string TrainerName { get; set; }
        public IEnumerable<TimeTableFilterUnit> LessonTimeTable { get; set; }       
    }

    public class ReadSportInfo 
    {
        public int SportId { get; set; }
        public string SportName { get; set; }
    }
}
