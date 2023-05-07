using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RMQEsportClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.ReadModels;
using UserWorkflow.Application.Services.Confirmation;
using UserWorkflow.Application.Services.Users;
using UserWorkflow.Esport;
using UserWorkflow.Esport.Models;
using UserWorkflow.Infrastructure.Security;
using UserWorkFlow.Infrastructure.Commands;

namespace UserWorkflow.Application.Commands.User
{
    public class UpdateAdminHandler : BaseUserHandler, ICommandHandler<UpdateAdmin>
    {
        private readonly EsportDataContext context;
        private readonly IConfirmationService confirmationService;
        private readonly IUserService userService;

        public UpdateAdminHandler(EsportDataContext context,
            IConfirmationService confirmationService,
            IUserService userService)
        {
            this.context = context;
            this.confirmationService = confirmationService;
            this.userService = userService;
        }

        public async Task<CommandResult> HandleCommandAsync(UpdateAdmin command)
        {
            if (command.UpdateUserInfo.UserId < 0)
            {
                throw new ApplicationException($"User id: {command.UpdateUserInfo.UserId} must be greater than -1");
            }

            var admin = await context.Administrators.FirstOrDefaultAsync(x => x.UserId.Equals(command.UpdateUserInfo.UserId));
            bool confirmEmail = false;

            if (admin == null)
            {
                confirmEmail = needConfirmation(command.UpdateUserInfo, command.AuthenticatedBy?.Email);
            }
            else 
            {
                confirmEmail = needConfirmation(command.UpdateUserInfo, admin.Email);
            }

            admin = createUser<Administrators>(command.UpdateUserInfo, !confirmEmail);
            var adminId = await userService.CreateOrUpdateAdministrator(admin, command.GymIds, confirmEmail);

            if (confirmEmail)
            {
                await confirmationService.SendConfirmation(UserRole.LocalAdmin, new Models.User.UserConfirmationModel()
                {
                    Email = command.UpdateUserInfo.Email,
                    RoleId = adminId,
                    UserId = command.UpdateUserInfo.UserId
                });
            }

            return new CommandResult(command.UpdateUserInfo.UserId);
        }

      
    }
}
