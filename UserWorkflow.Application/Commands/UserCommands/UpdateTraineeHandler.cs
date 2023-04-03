using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Services.Users;
using UserWorkflow.Esport;
using UserWorkflow.Esport.Models;
using UserWorkFlow.Infrastructure.Commands;

namespace UserWorkflow.Application.Commands.User
{
    public class UpdateTraineeHandler : BaseUserHandler, ICommandHandler<UpdateTrainee>
    {
        private readonly IUserService userService;
        private readonly EsportDataContext context;

        public UpdateTraineeHandler(IUserService userService, EsportDataContext context)
        {
            this.userService = userService;
            this.context = context;
        }

        public async Task<CommandResult> HandleCommandAsync(UpdateTrainee command)
        {
            if (command.UpdateUserInfo.UserId < 0)
            {
                throw new ApplicationException($"User id: {command.UpdateUserInfo.UserId} must be greater than -1");
            }

            var trainee = await context.Trainees.FirstOrDefaultAsync(x => x.Email.Equals(command.UpdateUserInfo.Email));
            if (trainee == null)
            {
                trainee = createUser<Trainee>(command.UpdateUserInfo, true);
            }

            var traineeId = await userService.CreateTrainee(trainee);

            return new CommandResult(traineeId);
        }
    }
}
