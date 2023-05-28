using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Base;
using UserWorkflow.Application.Models.Lesson;

namespace UserWorkflow.Application.Requests.Trainee
{
    public class GetTraineeLesonInfo: BaseRequest
    {
        public int LessonId { get; set; }
    }

    public class GetTraineeLesonInfoResult 
    {
        public DetailedLessonInfo DetailedLessonInfo { get; set; }
    }
}
