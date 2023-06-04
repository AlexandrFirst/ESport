using AutoMapper;
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
using UserWorkflow.Esport.Models;
using UserWorkFlow.Infrastructure.Commands;

namespace UserWorkflow.Application.Commands.Gym
{
    public class AddUpdateGymShiftHandler : ICommandHandler<AddUpdateGymShift>
    {
        private readonly EsportDataContext context;
        private readonly IMapper mapper;
        private readonly IMessageProducer messageProducer;

        public AddUpdateGymShiftHandler(EsportDataContext context,
            IMapper mapper,
            IMessageProducer messageProducer)
        {
            this.context = context;
            this.mapper = mapper;
            this.messageProducer = messageProducer;
        }

        public async Task<CommandResult> HandleCommandAsync(AddUpdateGymShift command)
        {
            var gym = await context.Gyms.FirstOrDefaultAsync(x => x.Id == command.GymId);

            if (gym == null)
            {
                throw new ApplicationException($"Gym with id: {command.GymId} is not found");
            }

            if (!command.IsTimeShiftsAreValid())
            {
                throw new ApplicationException("Start shift time must be greater than end time");
            }

            if (command.GymShiftInfos.Any())
            {
                var maxOpenTime = command.GymShiftInfos.Min(x => x.Start);
                var maxCloseTime = command.GymShiftInfos.Min(x => x.End);

                if (maxCloseTime >= gym.CloseTime || maxOpenTime <= gym.OpenTime)
                {
                    throw new ApplicationException("Open and close time should be in bound of gyms working our");
                }
            }

            var shiftsToUpdate = gym.GymShifts.Join(command.GymShiftInfos, x => x.Id, x => x.GymShiftId, (x, y) => new
            {
                _old = x,
                _new = y
            }).ToList();

            foreach (var updatedShift in shiftsToUpdate)
            {
                var lessonTimes = updatedShift._old.TrainerShedules.SelectMany(x => x.Lessons)
                    .ToList();
                if (lessonTimes.Any(x => x.FromTime < updatedShift._new.Start || x.ToTime > updatedShift._new.End) &&
                    !updatedShift._new.ForceUpdateOverridenTimes)
                {
                    throw new Exception("Unable to update shedules with overriden start and end times");
                }
                else
                {
                    lessonTimes.Where(x => x.FromTime < updatedShift._new.Start).ToList().ForEach(x =>
                    {
                        x.FromTime = updatedShift._new.Start;
                    });

                    lessonTimes.Where(x => x.ToTime > updatedShift._new.End).ToList().ForEach(x =>
                    {
                        x.FromTime = updatedShift._new.End;
                    });
                }
            }

            var shiftsToRemove = gym.GymShifts.Where(x => !command.GymShiftInfos.Any(p => p.GymShiftId == x.Id)).ToList();
            var shiftsToAdd = command.GymShiftInfos.Where(x => !gym.GymShifts.Any(p => p.Id == x.GymShiftId)).ToList();

            foreach (var item in shiftsToUpdate)
            {
                if (item._new.NotifyOnUpdate)
                {
                    handleTrainerNotification(item._old, item._new);
                }
                mapper.Map(item._new, item._old);
            }
            
            context.AddRange(mapper.Map<List<GymShift>>(shiftsToAdd, opt =>
            {
                opt.AfterMap((src, dest) =>
                {
                    dest.ForEach(k =>
                    {
                        k.GymId = command.GymId;
                    });
                });
            }));

            context.GymShifts.RemoveRange(shiftsToRemove);

            await context.SaveChangesAsync();
            return new CommandResult(gym.Id);
        }

        private void handleTrainerNotification(GymShift currentGymShift, GymShiftInfo updatedGymShift)
        {
            var trainerInfos = currentGymShift.TrainerShedules.Where(x => x.TrainerId != null).Select(x => new NotifySheduleModel { UserName = x.Trainer.Name, UserEmail = x.Trainer.Email });

            var informationToSend = $"The timetable of the shift has been modified from {currentGymShift.FromTime} - {currentGymShift.FromTime} to " +
                $"{updatedGymShift.Start} - {updatedGymShift.End}";

            foreach (var user in trainerInfos)
            {
                messageProducer.SendMessage(new MailIncommingModel
                {
                    Mail = user.UserEmail,
                    Template = informationToSend
                }, QueueConfigName.MessageConfig);
            }
        }

        private class NotifySheduleModel
        {
            public string UserName { get; set; }
            public string UserEmail { get; set; }
        }
    }
}
