using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Base;
using UserWorkflow.Application.Models.Lesson;

namespace UserWorkflow.Application.Requests.Trainee
{
    public class GetTraineeTimetable: BaseRequest
    {
        public int? DayOfTheWeeks { get; set; }
    }

    public class GetTraineeTimetableResult
    {
        public List<LessonInfo> lessonInfos { get; set; }
    }
}
