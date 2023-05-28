using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Models.User;
using UserWorkflow.Esport;
using UserWorkflow.Esport.Models;
using UserWorkflow.Infrastructure.Paging;
using UserWorkFlow.Infrastructure.Queries;

namespace UserWorkflow.Application.Requests.Trainer
{
    public class GetPendingTraineesHandler : IRequestHandler<GetPendingTrainees, GetPendingTraineesResult>
    {
        private readonly EsportDataContext esportDataContext;
        private readonly IPaging<TraineeShedule> paging;

        public GetPendingTraineesHandler(EsportDataContext esportDataContext, IPaging<TraineeShedule> paging)
        {
            this.esportDataContext = esportDataContext;
            this.paging = paging;
        }

        public async Task<RequestResult<GetPendingTraineesResult>> HandleQueryAsync(GetPendingTrainees request)
        {
            var userId = request.AuthenticatedBy.UserId;
            var trainer = await esportDataContext.Trainers.FirstOrDefaultAsync(x => x.UserId == userId);

            if (trainer == null)
            {
                throw new ApplicationException("Trainer with user id: " + userId + " is not found");
            }

            var pendingTrainees = esportDataContext.TraineeShedules.Where(x => x.IsPending == true && x.Lesson.TrainerShedule.TrainerId == trainer.Id);
            if (request.LessonIds.Any())
            {
                pendingTrainees = pendingTrainees.Where(x => request.LessonIds.Any(d => d == x.LessonId));
            }

            var pagedTraineeSchedule = await paging.ApplyPagingAsync(pendingTrainees, request.Page, request.PageSize);
            var result = pagedTraineeSchedule.Listing.Select(x => new PendingTraineeInfo()
            {
                LessonId = x.LessonId,
                TraineeId = x.TraineeId ?? 0,
                TraineeName = x.Trainee?.Name ?? string.Empty + " " + x.Trainee?.Surname ?? string.Empty,
                UserId = x.Trainee?.UserId ?? 0,
            });

            return new RequestResult<GetPendingTraineesResult>(new GetPendingTraineesResult()
            {
                Page = pagedTraineeSchedule.CurrentPage,
                PendingTrainees = result.ToList(),
                TotalItems = pagedTraineeSchedule.Total,
                TotalPages = pagedTraineeSchedule.TotalPage
            });
        }
    }
}
