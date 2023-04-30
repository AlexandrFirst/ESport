using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Clients;
using UserWorkflow.Esport;
using UserWorkflow.Infrastructure.Security;
using UserWorkFlow.Infrastructure.Commands;

namespace UserWorkflow.Application.Commands.UserCommands
{
    public class ConfirmAdminHandler : ICommandHandler<ConfirmAdmin>
    {
        private readonly EsportDataContext context;
        private readonly IdentityClient identityClient;

        public ConfirmAdminHandler(EsportDataContext context, IdentityClient identityClient)
        {
            this.context = context;
            this.identityClient = identityClient;
        }

        public async Task<CommandResult> HandleCommandAsync(ConfirmAdmin command)
        {
            var organisationAdministrator = await context.OrganisationAdministrators.FirstOrDefaultAsync(x => x.UserId == command.UserId);
            if (organisationAdministrator == null) { throw new ApplicationException("No org admin is found for user id: " + command.UserId); }
            organisationAdministrator.IsConfirmed = true;

            var isUpdaterSuccess = await identityClient.UpdateUserProfile(new Models.User.UpdateUserInfo()
            {
                UserId = command.UserId,
                RolesToAdd = new List<int>() { UserRole.OrgAdmin.RoleId }
            });

            if (!isUpdaterSuccess) { throw new ApplicationException("Unable to confirm oarganisation admin account"); };

            await context.SaveChangesAsync();
            return new CommandResult(1);
        }
    }
}
