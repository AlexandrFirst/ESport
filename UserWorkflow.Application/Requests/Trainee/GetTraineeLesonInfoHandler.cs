using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Models.Lesson;
using UserWorkflow.Application.Services.Lesson;
using UserWorkflow.Esport;
using UserWorkFlow.Infrastructure.Queries;

namespace UserWorkflow.Application.Requests.Trainee
{
    public class GetTraineeLesonInfoHandler : IRequestHandler<GetTraineeLesonInfo, GetTraineeLesonInfoResult>
    {
        private readonly EsportDataContext esportDataContext;
        private readonly ILessonService lessonService;

        public GetTraineeLesonInfoHandler(EsportDataContext esportDataContext, ILessonService lessonService)
        {
            this.esportDataContext = esportDataContext;
            this.lessonService = lessonService;
        }

        public async Task<RequestResult<GetTraineeLesonInfoResult>> HandleQueryAsync(GetTraineeLesonInfo request)
        {
            var userId = request.AuthenticatedBy.UserId;
            var trainee = await esportDataContext.Trainees.FirstOrDefaultAsync(x => x.UserId == userId);

            if (trainee == null)
            {
                throw new ApplicationException("Unable to find trainee with user id: " + userId);
            }

            var lessonTraineeInfo = await lessonService.GetLessonExerciseInfo(request.LessonId, trainee.Id);
            var result = new DetailedLessonInfo()
            {
                LessonId = request.LessonId,
                lessonExerciseInfos = lessonTraineeInfo
            };

            return new RequestResult<GetTraineeLesonInfoResult>(new GetTraineeLesonInfoResult()
            {
                DetailedLessonInfo = result,
            });
        }
    }
}
