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

namespace UserWorkflow.Application.Requests.GymAdmin
{
    public class GetPendingTrainersHandler : IRequestHandler<GetPendingTrainers, GetPendingTrainersResult>
    {
        private readonly EsportDataContext esportDataContext;
        private readonly IPaging<TrainerResponse> paging;

        public GetPendingTrainersHandler(EsportDataContext esportDataContext, IPaging<TrainerResponse> paging)
        {
            this.esportDataContext = esportDataContext;
            this.paging = paging;
        }

        public async Task<RequestResult<GetPendingTrainersResult>> HandleQueryAsync(GetPendingTrainers request)
        {
            if (request.CurrentPage < 1)
            {
                throw new ApplicationException($"requsting page should be gereater than 0. Current page: {request.CurrentPage}");
            }

            if (request.PageSize < 1)
            {
                throw new ApplicationException($"page size should be gereater than 0. Current page size: {request.PageSize}");
            }

            var trainerResponseQuery = esportDataContext.TrainerResponses.AsQueryable();
            if (request.GymId != null)
            {
                trainerResponseQuery = trainerResponseQuery.Where(x => x.TrainerRequest.TrainerShedule.GymShift.GymId == request.GymId);
            }

            if (request.ShiftId != null)
            {
                trainerResponseQuery = trainerResponseQuery.Where(x => x.TrainerRequest.TrainerShedule.ShiftId == request.ShiftId);
            }

            var queryResutlt = await paging.ApplyPagingAsync(trainerResponseQuery, request.CurrentPage, request.PageSize);
            var pendingTrainers = queryResutlt.Listing.Select(x => new PendingTrainerModel()
            {
                RequestId = x.TrainerRequestId,
                TrainerInfo = new TrainerInfo()
                {
                    Email = x.Trainer.Email,
                    Id = x.Trainer.Id,
                    Name = x.Trainer.Name,
                    TrainerSportInfos = x.Trainer.TrainerSports.Select(k => new TrainerSportInfo()
                    {
                        SportId= k.Id,
                        FromDate = k.FromDate,
                        Name = k.Sport.Name,
                        Level = k.Level,
                        ToDate = k.ToDate ?? DateTime.Now
                    }).ToList()
                },
                ScheduleInfo = new ScheduleInfo()
                {
                    DayOfTheWeek = x.TrainerRequest.TrainerShedule?.TimeOverride?.Any() == true ?
                        string.Join('|', x.TrainerRequest.TrainerShedule.TimeOverride.Select(x => x.GetDaysList())) : DayOfTheWeek.ALL.ToString(),
                    From = x.TrainerRequest.TrainerShedule.GymShift.FromTime,
                    To = x.TrainerRequest.TrainerShedule.GymShift.ToTime,
                    GymId = x.TrainerRequest.TrainerShedule.GymShift.GymId,
                    ShiftId = x.TrainerRequest.TrainerShedule.ShiftId
                }
            });

            return new RequestResult<GetPendingTrainersResult>(new GetPendingTrainersResult()
            {
                CurrentPage = queryResutlt.CurrentPage,
                PageSize = queryResutlt.CurrentPage,
                PendingTrainerModels = pendingTrainers.ToList(),
                TotalItems = queryResutlt.Total
            });
        }
    }
}
