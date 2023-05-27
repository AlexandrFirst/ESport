using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Models.Lesson;
using UserWorkflow.Esport;

namespace UserWorkflow.Application.Services.Lesson
{
    public class LessonService: ILessonService
    {
        private readonly EsportDataContext esportDataContext;

        public LessonService(EsportDataContext esportDataContext)
        {
            this.esportDataContext = esportDataContext;
        }

        public async Task<List<LessonExerciseInfo>> GetLessonExerciseInfo(int lessonId, int? traineeId)
        {
            var lesson = await esportDataContext.Lessons.FirstOrDefaultAsync(x => x.Id == lessonId);
            if (lesson == null) 
            {
                throw new ApplicationException("Lesson with id: " + lessonId + " is not found");
            }

            var traineeSchedules = lesson.TraineeShedules;
            if (traineeId != null) 
            {
                traineeSchedules = traineeSchedules.Where(x => x.TraineeId == traineeId.Value).ToList();
            }

            return traineeSchedules.Select(x => new LessonExerciseInfo()
            {
                TraineeId = x.TraineeId ?? 0,
                TraineeName = x.Trainee?.Name ?? string.Empty + " " + x.Trainee?.Surname ?? string.Empty,
                TraineeExercises = x.TraineeSheduleExercises?.Select(c => new TraineeExercise()
                {
                    Description = c.TraineeExercise.Exercise.Description,
                    ExerciseId = c.TraineeExercise.Exercise.Id,
                    ExerciseNotes = c.Notes,
                    ExerciseOrder= c.Order,
                    TutorialLink =c.TraineeExercise.Exercise.ExerciseTutorails?.Select(v => v.Link).ToList()
                }).ToList() ?? new List<TraineeExercise>()
            }).ToList();
        }
    }
}
