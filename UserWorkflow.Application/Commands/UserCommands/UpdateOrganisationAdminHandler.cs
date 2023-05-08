using Microsoft.EntityFrameworkCore;
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
    public class UpdateOrganisationAdminHandler : BaseUserHandler, ICommandHandler<UpdateOrganisationAdmin>
    {
        private readonly EsportDataContext context;
        private readonly IUserService userService;
        private readonly IConfirmationService confirmationService;

        public UpdateOrganisationAdminHandler(EsportDataContext context, IUserService userService, IConfirmationService confirmationService)
        {
            this.context = context;
            this.userService = userService;
            this.confirmationService = confirmationService;
        }

        public async Task<CommandResult> HandleCommandAsync(UpdateOrganisationAdmin command)
        {
            if (command.UpdateUserInfo.UserId < 0)
            {
                throw new ApplicationException($"User id: {command.UpdateUserInfo.UserId} must be greater than -1");
            }

            var organisationAdmin = await context.OrganisationAdministrators.FirstOrDefaultAsync(x => x.UserId.Equals(command.UpdateUserInfo.UserId));
            bool confirmEmail = false;
            if (organisationAdmin == null)
            {
                confirmEmail = needConfirmation(command.UpdateUserInfo, command.AuthenticatedBy?.Email);
            }
            else {
                confirmEmail = needConfirmation(command.UpdateUserInfo, organisationAdmin.Email);
            }
            organisationAdmin = createUser<OrganisationAdministrators>(command.UpdateUserInfo, !confirmEmail);
            var orgnistaionAdminId = await userService.CreateOrUpdateOrganisationAdministrator(organisationAdmin, command.OrganisationId, confirmEmail);

            if (confirmEmail)
            {
                await confirmationService.SendConfirmation(UserRole.OrgAdmin, new Models.User.UserConfirmationModel()
                {
                    Email = command.UpdateUserInfo.Email,
                    RoleId = orgnistaionAdminId,
                    UserId = command.UpdateUserInfo.UserId
                });
            }

            return new CommandResult(orgnistaionAdminId);
        }
    }
}
