using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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

            return new RequestResult<GetTrainerTimeTableResult>(new GetTrainerTimeTableResult()
            {
                GymTimeTable = trainerGymTimeTable.Data.GymTimeTable
            });
        }
    }
}
