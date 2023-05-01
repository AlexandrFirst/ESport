using Microsoft.EntityFrameworkCore;
using RMQEsportClient;
using RMQEsportClient.QueueConfigs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Models.Email;
using UserWorkflow.Esport;
using UserWorkFlow.Infrastructure.Commands;

namespace UserWorkflow.Application.Commands.Gym
{
    public class UpdateTrainerRequestHandler : ICommandHandler<UpdateTrainerRequest>
    {
        private readonly EsportDataContext esportDataContext;
        private readonly IMessageProducer messageProducer;

        public UpdateTrainerRequestHandler(EsportDataContext esportDataContext, 
            IMessageProducer messageProducer)
        {
            this.esportDataContext = esportDataContext;
            this.messageProducer = messageProducer;
        }

        public async Task<CommandResult> HandleCommandAsync(UpdateTrainerRequest command)
        {
            var trainerRequest = await esportDataContext.TrainerRequests.FirstOrDefaultAsync(x => x.Id == command.TrainerRequestId);
            if (trainerRequest == null) 
            {
                throw new ApplicationException("Unable to find trainer request with id: " + command.TrainerRequestId);
            }

            trainerRequest.Description = command.Description;
            var trainerResponses = trainerRequest.TrainerResponses.ToList();
            trainerResponses.ForEach(response => 
            {
                messageProducer.SendMessage(new MailIncommingModel()
                {
                    Mail = response.Trainer.Email,
                    Template = "Request with id: " + trainerRequest.Id + " on which you left response changed the description to: " + command.Description
                }, QueueConfigName.MessageConfig);
            });

            await esportDataContext.SaveChangesAsync();

            return new CommandResult(trainerRequest.Id);
        }
    }
}
