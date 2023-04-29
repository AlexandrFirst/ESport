using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Esport;
using UserWorkFlow.Infrastructure.Commands;

namespace UserWorkflow.Application.Commands.Gym
{
    public class AddUpdateGymShiftHandler : ICommandHandler<AddUpdateGymShift>
    {
        private readonly EsportDataContext context;

        public AddUpdateGymShiftHandler(EsportDataContext context)
        {
            this.context = context;
        }

        public async Task<CommandResult> HandleCommandAsync(AddUpdateGymShift command)
        {
            var gym = await context.Gyms.FirstOrDefaultAsync(x => x.Id == command.GymId);

            if (gym == null) 
            {
                throw new ApplicationException($"Gym with id: {command.GymId} is not found");
            }
        }
    }
}
