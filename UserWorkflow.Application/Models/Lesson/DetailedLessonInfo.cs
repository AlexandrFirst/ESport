using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserWorkflow.Application.Models.Lesson
{
    public class DetailedLessonInfo
    {
        public int LessonId { get; set; }
        public List<LessonExerciseInfo> lessonExerciseInfos { get; set; }
    }    
}
