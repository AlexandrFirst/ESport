using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Models.Base;

namespace UserWorkflow.Application.Models.Lesson
{
    public class LessonSportFilter
    {
        public List<int> SportIds { get; set; }
        public LogicalOperation LogicalOperation { get; set; }
    }
}
