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
    public class DeclineTrainerResponseHandler : ICommandHandler<DeclineTrainerResponse>
    {
        private readonly EsportDataContext esportDataContext;
        private readonly IMessageProducer messageProducer;

        public DeclineTrainerResponseHandler(EsportDataContext esportDataContext, IMessageProducer messageProducer)
        {
            this.esportDataContext = esportDataContext;
            this.messageProducer = messageProducer;
        }
        public async Task<CommandResult> HandleCommandAsync(DeclineTrainerResponse command)
        {
            var trainerResponse = await esportDataContext.TrainerResponses.FirstOrDefaultAsync(x => x.Id == command.ResponseId);
            if (trainerResponse == null) 
            {
                throw new ApplicationException("Unable to find response with id: " + command.ResponseId);
            }

            messageProducer.SendMessage(new MailIncommingModel()
            {
                Mail = trainerResponse.Trainer.Email,
                Template = "Your response was declined to request with id: " + trainerResponse.TrainerRequestId
            }, QueueConfigName.MessageConfig);

            esportDataContext.TrainerResponses.Remove(trainerResponse);
            await esportDataContext.SaveChangesAsync();

            return new CommandResult(1);
        }
    }
}
