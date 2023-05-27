using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Models.Lesson;

namespace UserWorkflow.Application.Services.Lesson
{
    public interface ILessonService
    {
        Task<List<LessonExerciseInfo>> GetLessonExerciseInfo(int lessonId, int? traineeId);
    }
}
