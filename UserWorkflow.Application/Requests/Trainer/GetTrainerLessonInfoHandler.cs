using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Models.Lesson;
using UserWorkflow.Application.Services.Lesson;
using UserWorkflow.Esport;
using UserWorkFlow.Infrastructure.Queries;

namespace UserWorkflow.Application.Requests.Trainer
{
    public class GetTrainerLessonInfoHandler : IRequestHandler<GetTrainerLessonInfo, GetTrainerLessonInfoResult>
    {
        private readonly EsportDataContext esportDataContext;
        private readonly ILessonService lessonService;

        public GetTrainerLessonInfoHandler(EsportDataContext esportDataContext, ILessonService lessonService)
        {
            this.esportDataContext = esportDataContext;
            this.lessonService = lessonService;
        }

        public async Task<RequestResult<GetTrainerLessonInfoResult>> HandleQueryAsync(GetTrainerLessonInfo request)
        {
            if (request.LessonId < 1)
            {
                throw new ApplicationException("Lesson id must be greater than 0");
            }

            var exerciseLessonInfo = await lessonService.GetLessonExerciseInfo(request.LessonId, null);
            var result = new DetailedLessonInfo()
            {
                lessonExerciseInfos = exerciseLessonInfo,
                LessonId = request.LessonId
            };

            return new RequestResult<GetTrainerLessonInfoResult>(new GetTrainerLessonInfoResult() { DetailedLessonInfo = result });

        }
    }
}
