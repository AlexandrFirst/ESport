using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Services;
using UserWorkflow.Esport;
using UserWorkflow.Esport.Models;
using UserWorkFlow.Infrastructure.Commands;

namespace UserWorkflow.Application.Commands.User
{
    public class UpdateTrainerHandler : BaseUserHandler, ICommandHandler<UpdateTrainer>
    {
        private readonly IUserService userService;
        private readonly EsportDataContext context;

        public UpdateTrainerHandler(IUserService userService, EsportDataContext context)
        {
            this.userService = userService;
            this.context = context;
        }

        public async Task<CommandResult> HandleCommandAsync(UpdateTrainer command)
        {
            if (command.UpdateUserInfo.UserId < 0)
            {
                throw new ApplicationException($"User id: {command.UpdateUserInfo.UserId} must be greater than -1");
            }

            var trainer = await context.Trainers.FirstOrDefaultAsync(x => x.Email.Equals(command.UpdateUserInfo.Email));
            if (trainer == null)
            {
                trainer = createUser<Trainer>(command.UpdateUserInfo, true);
            }

            var traineeId = await userService.CreateTrainer(trainer);

            return new CommandResult(traineeId);
        }
    }
}
