using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Esport;
using UserWorkflow.Esport.Models;
using UserWorkFlow.Infrastructure.Commands;

namespace UserWorkflow.Application.Commands.Trainer
{
    public class ApplyTrainerForTimeScheduleHandler : ICommandHandler<ApplyTrainerForTimeSchedule>
    {
        private readonly EsportDataContext esportDataContext;

        public ApplyTrainerForTimeScheduleHandler(EsportDataContext esportDataContext)
        {
            this.esportDataContext = esportDataContext;
        }

        public async Task<CommandResult> HandleCommandAsync(ApplyTrainerForTimeSchedule command)
        {
            var userId = command.AuthenticatedBy.UserId;

            var trainer = await esportDataContext.Trainers.FirstOrDefaultAsync(x => x.UserId == userId);
            if (trainer == null) 
            {
                throw new ApplicationException("No trainer with user id: " + userId + " is found");
            }

            var trainerRequest = await esportDataContext.TrainerRequests.FirstOrDefaultAsync(x => x.Id == command.TrainerRequestId);
            if (trainerRequest == null) 
            {
                throw new ApplicationException("Unable to find trainer request with id: " + command.TrainerRequestId);
            }

            var m_trainerResponse = await esportDataContext.TrainerResponses.FirstOrDefaultAsync(x => x.Trainer.UserId == userId && x.TrainerRequestId == command.TrainerRequestId);
            if (m_trainerResponse != null)
            {
                throw new Exception("You can not apply twice for one request");
            }

            m_trainerResponse = new TrainerResponse()
            {
                ApplicationTime = DateTime.UtcNow,
                TrainerRequestId = command.TrainerRequestId,
                TrainerId = trainer.Id,
            };

            await esportDataContext.TrainerResponses.AddAsync(m_trainerResponse);
            await esportDataContext.SaveChangesAsync();

            return new CommandResult(m_trainerResponse.Id);
        }
    }
}
