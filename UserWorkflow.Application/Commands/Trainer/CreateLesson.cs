using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Base;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Application.Commands.Trainer
{
    public class CreateLesson: BaseCommand
    {
        public int TrainerScheduleId { get; set; }
        public LessonTimeOverride LessonTimeOverride { get; set; }
        public LessonType LessonType { get; set; }
    }

    public class LessonTimeOverride 
    {
        public TimeSpan? FromTime { get; set; }
        public TimeSpan? ToTime { get; set; }
        public int? DayOfTheWeek { get; set; }
    }
}
