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
    public class ConfirmGymAdminHandler : ICommandHandler<ConfirmGymAdmin>
    {
        private readonly EsportDataContext context;
        private readonly IdentityClient identityClient;

        public ConfirmGymAdminHandler(EsportDataContext context, IdentityClient identityClient)
        {
            this.context = context;
            this.identityClient = identityClient;
        }

        public async Task<CommandResult> HandleCommandAsync(ConfirmGymAdmin command)
        {
            var gymAdministrator = await context.GymAdministrators
                .FirstOrDefaultAsync(x => x.Administrators.UserId == command.UserId &&
                    x.GymId == command.GymId);
            if (gymAdministrator == null) { throw new ApplicationException("No gym admin is found for user id: " + command.UserId); }
            gymAdministrator.IsConfirmed = true;

            var isUpdateAccount = await identityClient.UpdateUserProfile(new Models.User.UpdateUserInfo()
            {
                UserId = command.UserId,
                RolesToAdd = new List<int>()
                {
                    UserRole.LocalAdmin.RoleId
                }
            });

            if (!isUpdateAccount) { throw new ApplicationException("Unable to confirm local(gym) admin account"); };
            await context.SaveChangesAsync();
            return new CommandResult(1);
        }
    }
}
