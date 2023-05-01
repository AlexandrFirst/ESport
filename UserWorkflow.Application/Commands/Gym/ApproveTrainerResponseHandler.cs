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
    public class ApproveTrainerResponseHandler : ICommandHandler<ApproveTrainerResponse>
    {
        private readonly EsportDataContext dataContext;
        private readonly IMessageProducer messageProducer;

        public ApproveTrainerResponseHandler(EsportDataContext dataContext, IMessageProducer messageProducer)
        {
            this.dataContext = dataContext;
            this.messageProducer = messageProducer;
        }
        public async Task<CommandResult> HandleCommandAsync(ApproveTrainerResponse command)
        {
            var trainer = await dataContext.Trainers.FirstOrDefaultAsync(x => x.Id == command.TrainerId);
            if (trainer == null)
            {
                throw new ApplicationException("Unable to find trainer with id: " + command.TrainerId);
            }

            var trainerResponse = trainer.TrainerResponses.FirstOrDefault(x => x.TrainerRequestId == command.RequestId);
            if (trainerResponse == null)
            {
                throw new ApplicationException("Unable to find trainer response to request with id: " + command.RequestId);
            }

            var trainerSchedule = trainerResponse.TrainerRequest.TrainerShedule;

            trainerSchedule.Trainer = trainer;
            messageProducer.SendMessage(new MailIncommingModel()
            {
                Mail = trainer.Email,
                Template = "You have been approved to your requst with id: " + trainerResponse.TrainerRequestId + " for schedule with id: " + trainerSchedule.Id
            }, QueueConfigName.MessageConfig);

            var allRequestResponses = trainerResponse.TrainerRequest.TrainerResponses.Where(x => x.TrainerId != command.TrainerId).ToList();
            allRequestResponses.ForEach(response => 
            {
                messageProducer.SendMessage(new MailIncommingModel()
                {
                    Mail = response.Trainer.Email,
                    Template = "Your response was declined to request with id: " + response.TrainerRequestId
                }, QueueConfigName.MessageConfig);
            });
            dataContext.TrainerResponses.RemoveRange(allRequestResponses);

            await dataContext.SaveChangesAsync();
            return new CommandResult(1);
        }
    }
}
