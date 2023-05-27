using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Models.Base;
using UserWorkflow.Application.Models.TimeTable;

namespace UserWorkflow.Application.Models.Lesson
{
    public class LessonTimeTableFilter
    {
        public List<TimeTableFilterUnit> TimeTableFilterUnits { get; set; }
        public LogicalOperation LogicalOperation { get; set; }
    }
}
