using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Esport;
using UserWorkflow.Esport.Models;
using UserWorkflow.Infrastructure.Paging;
using UserWorkFlow.Infrastructure.Queries;

namespace UserWorkflow.Application.Requests.GymAdmin
{
    public class GetGymRequestsHandler : IRequestHandler<GetGymRequests, GetGymRequestsResult>
    {
        private readonly EsportDataContext dataContext;
        private readonly IPaging<TrainerRequest> paging;

        public GetGymRequestsHandler(EsportDataContext dataContext, IPaging<TrainerRequest> paging)
        {
            this.dataContext = dataContext;
            this.paging = paging;
        }
        public async Task<RequestResult<GetGymRequestsResult>> HandleQueryAsync(GetGymRequests request)
        {
            var trainerRequestQuery = dataContext.TrainerRequests.AsQueryable();

            var userId = request.AuthenticatedBy.UserId;
            var trainer = await dataContext.Trainers.FirstOrDefaultAsync(x => x.UserId == userId);

            if (request.OrganisationId.HasValue && request.OrganisationId > 0)
            {
                trainerRequestQuery = trainerRequestQuery.Where(x => x.TrainerShedule.GymShift.Gym.OrganisationId == request.OrganisationId);
            }

            if (request.GymId.HasValue && request.GymId > 0)
            {
                trainerRequestQuery = trainerRequestQuery.Where(x => x.TrainerShedule.GymShift.GymId == request.GymId);
            }

            var appliedTrainerRequests = trainer == null ? new List<int>() : trainer.TrainerResponses.Select(x => x.TrainerRequestId).ToList();

            var trainerRequestResult = await paging.ApplyPagingAsync(trainerRequestQuery, request.Page, request.PageSize);

            var trainerRequestsResponse = trainerRequestResult.Listing.Select(x => new GymRequestItem()
            {
                RequestId = x.Id,
                GymId = x.TrainerShedule.GymShift.GymId,
                GymName = x.TrainerShedule.GymShift.Gym.Name,
                RequestDescription = x.Description,
                TimeOverrides = x.TrainerShedule.TimeOverride,
                DayOfTheWeeks = x.TrainerShedule.TimeOverride?.Any() == true ? new List<DayOfTheWeek>() : ParseDayOfTheWeek(x.TrainerShedule.GymShift.DayOfTheWeeks),
                From = x.TrainerShedule.TimeOverride?.Any() == true ? null : x.TrainerShedule.GymShift.FromTime,
                To = x.TrainerShedule.TimeOverride?.Any() == true ? null : x.TrainerShedule.GymShift.ToTime,
                ShiftId = x.TrainerShedule.ShiftId,
                IsApplied = appliedTrainerRequests.Any(p => p == x.Id)
            }).ToList();

            return new RequestResult<GetGymRequestsResult>(new GetGymRequestsResult()
            {
                GymRequestItems = trainerRequestsResponse,
                Page = trainerRequestResult.CurrentPage,
                TotalPages = trainerRequestResult.TotalPage,
                TotalItems = trainerRequestResult.Total
            });
        }
        private List<DayOfTheWeek> ParseDayOfTheWeek(int dayOfTheWeek)
        {
            var result = new List<DayOfTheWeek>();
            foreach (var dow in Enum.GetValues(typeof(DayOfTheWeek)))
            {
                var currentDay = (DayOfTheWeek)dow;
                if ((DayOfTheWeek)dow == DayOfTheWeek.ALL) { continue; }
                if ((dayOfTheWeek & (int)dow) == (int)dow) { result.Add((DayOfTheWeek)dow); }
            }
            return result;

        }

    }
}
