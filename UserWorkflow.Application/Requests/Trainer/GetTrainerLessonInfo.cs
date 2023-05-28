using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Base;
using UserWorkflow.Application.Models.Lesson;

namespace UserWorkflow.Application.Requests.Trainer
{
    public class GetTrainerLessonInfo : BaseRequest
    {
        public int LessonId { get; set; }
    }

    public class GetTrainerLessonInfoResult
    {
        public DetailedLessonInfo DetailedLessonInfo { get; set; }
    }
}
