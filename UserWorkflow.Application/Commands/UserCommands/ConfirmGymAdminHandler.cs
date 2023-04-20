using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Esport;
using UserWorkFlow.Infrastructure.Commands;

namespace UserWorkflow.Application.Commands.UserCommands
{
    public class ConfirmGymAdminHandler : ICommandHandler<ConfirmGymAdmin>
    {
        private readonly EsportDataContext context;

        public ConfirmGymAdminHandler(EsportDataContext context)
        {
            this.context = context;
        }

        public async Task<CommandResult> HandleCommandAsync(ConfirmGymAdmin command)
        {
            var gymAdministrator = await context.GymAdministrators
                .FirstOrDefaultAsync(x => x.Administrators.UserId == command.UserId &&
                    x.GymId == command.GymId);
            if (gymAdministrator == null) { throw new ApplicationException("No gym admin is found for user id: " + command.UserId); }
            gymAdministrator.IsConfirmed = true;
            await context.SaveChangesAsync();
            return new CommandResult(1);
        }
    }
}
