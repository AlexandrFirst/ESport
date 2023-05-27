using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Services.Confirmation;
using UserWorkflow.Application.Services.Users;
using UserWorkflow.Esport;
using UserWorkflow.Esport.Models;
using UserWorkflow.Infrastructure.Security;
using UserWorkFlow.Infrastructure.Commands;

namespace UserWorkflow.Application.Commands.User
{
    public class UpdateTraineeHandler : BaseUserHandler, ICommandHandler<UpdateTrainee>
    {
        private readonly IUserService userService;
        private readonly EsportDataContext context;
        private readonly IConfirmationService confirmationService;

        public UpdateTraineeHandler(IUserService userService, 
            EsportDataContext context, IConfirmationService confirmationService)
        {
            this.userService = userService;
            this.context = context;
            this.confirmationService = confirmationService;
        }

        public async Task<CommandResult> HandleCommandAsync(UpdateTrainee command)
        {
            if (command.UpdateUserInfo.UserId < 0)
            {
                throw new ApplicationException($"User id: {command.UpdateUserInfo.UserId} must be greater than -1");
            }

            var trainee = await context.Trainees.FirstOrDefaultAsync(x => x.UserId.Equals(command.UpdateUserInfo.UserId));
            bool confirmEmail = false;

            if (trainee == null)
            {
                confirmEmail = needConfirmation(command.UpdateUserInfo, command.AuthenticatedBy?.Email);
            }
            else 
            {
                confirmEmail = needConfirmation(command.UpdateUserInfo, trainee.Email);
            }

            trainee = createUser<Esport.Models.Trainee>(command.UpdateUserInfo, !confirmEmail);
            var traineeId = await userService.CreateTrainee(trainee, confirmEmail);


            if (confirmEmail)
            {
                await confirmationService.SendConfirmation(UserRole.Trainee, new Models.User.UserConfirmationModel()
                {
                    Email = command.UpdateUserInfo.Email,
                    RoleId = traineeId,
                    UserId = command.UpdateUserInfo.UserId
                });
            }

            return new CommandResult(traineeId);
        }
    }
}
