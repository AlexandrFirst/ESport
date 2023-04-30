using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Esport;
using UserWorkflow.Esport.Models;
using UserWorkFlow.Infrastructure.Commands;

namespace UserWorkflow.Application.Commands.Gym
{
    public class OpenTrainerRequestHandler : ICommandHandler<OpenTrainerRequest>
    {
        private readonly EsportDataContext esportDataContext;

        public OpenTrainerRequestHandler(EsportDataContext esportDataContext)
        {
            this.esportDataContext = esportDataContext;
        }

        public async Task<CommandResult> HandleCommandAsync(OpenTrainerRequest command)
        {
            var requestingShift = await esportDataContext.GymShifts.FirstOrDefaultAsync(x => x.Id == command.ShiftId);
            if (requestingShift == null) 
            {
                throw new ApplicationException("Unable to find shift with id: " + command.ShiftId);
            }

            TrainerShedule trainerShedule = null;
            if (command.TrainerSheduleId != null)
            {
                trainerShedule = requestingShift.TrainerShedules.FirstOrDefault(x => x.Id == command.TrainerSheduleId);
                if (trainerShedule == null)
                {
                    throw new ApplicationException("No trainer shedule with id: " + command.TrainerSheduleId + " is found");
                }
            }
            else 
            {
                var overridenTime = command.TimeOverride;
                if (overridenTime != null)
                {
                    if (requestingShift.FromTime > overridenTime.From || requestingShift.ToTime < overridenTime.To) 
                    {
                        throw new ApplicationException("Trainer shedule time cannot expand shift time: " + overridenTime.GetDaysList());
                    }
                }

                trainerShedule = new TrainerShedule()
                {
                    GymShift = requestingShift,
                    Status = TrainerStatus.Pending,
                    TimeOverride = new List<TimeOverride>() { command.TimeOverride }
                };
            }

            var scheduleRequest = new TrainerRequest()
            {
                Description = command.Description,
            };

            trainerShedule.TrainerRequests.Add(scheduleRequest);

            await esportDataContext.SaveChangesAsync();

            return new CommandResult(scheduleRequest.Id);

        }
    }
}
