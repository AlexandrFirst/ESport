using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Extensions;
using UserWorkflow.Application.Models.Gym;
using UserWorkflow.Application.Requests.GymAdmin;
using UserWorkflow.Esport;
using UserWorkFlow.Infrastructure.Queries;

namespace UserWorkflow.Application.Requests.Trainer
{
    public class GetTrainerTimeTableHandler : IRequestHandler<GetTrainerTimeTable, GetTrainerTimeTableResult>
    {
        private readonly EsportDataContext esportDataContext;
        private readonly IRequestBus requestBus;

        public GetTrainerTimeTableHandler(EsportDataContext esportDataContext, IRequestBus requestBus)
        {
            this.esportDataContext = esportDataContext;
            this.requestBus = requestBus;
        }

        public async Task<RequestResult<GetTrainerTimeTableResult>> HandleQueryAsync(GetTrainerTimeTable request)
        {

            var trainer = await esportDataContext.Trainers.FirstOrDefaultAsync(x => x.Id == request.TrainerId);
            if (trainer == null) { throw new ApplicationException("Unable to get trainer with id: " + request.TrainerId); }

            var trainerGyms = trainer.TraineeShedules.Select(x => x.GymShift.GymId).Distinct().ToList();

            if (!trainerGyms.Any()) {
                throw new ApplicationException("Trainer with id: " + trainer.Id + " has not gyms to train");
            }

            if (request.GymId != null)
            {
                trainerGyms = trainerGyms.Where(x => x == request.GymId.Value).ToList();
            }

            var trainerGymTimeTable = await requestBus.ExecuteAsync<GetGymTimeTable, GetGymTimeTableResponse>(request.AuthenticatedBy.User, new GetGymTimeTable()
            {
                DayOfTheWeek = request.DayOfTheWeek,
                GymId = trainerGyms,
                TrainerId = request.TrainerId,
            });

            var startDateTime = request.StartDateTime ?? DateTime.Today;
            var endDateTime = startDateTime.AddDays(request.DayRange ?? 30);


            List<GymTimeTableByDate> gymTimeTable = new List<GymTimeTableByDate>();
            for (; startDateTime <= endDateTime; startDateTime = startDateTime.AddDays(1)) 
            {
                var dow = startDateTime.DayOfWeek.GetMyDayOfTheWeek();
                var dayTimeTable = trainerGymTimeTable.Data.GymTimeTable.Where(x => x.DayOfTheWeek == dow);
                gymTimeTable.AddRange(dayTimeTable.Select(x => new GymTimeTableByDate()
                {
                    DateTime = startDateTime,
                    DayTimeTable = x.DayTimeTable,
                    GymId = x.GymId
                }));
            }

            return new RequestResult<GetTrainerTimeTableResult>(new GetTrainerTimeTableResult()
            {
                GymTimeTable = gymTimeTable
            });
        }
    }
}
