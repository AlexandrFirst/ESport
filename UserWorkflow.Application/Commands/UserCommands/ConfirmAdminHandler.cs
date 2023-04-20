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
    public class ConfirmAdminHandler : ICommandHandler<ConfirmAdmin>
    {
        private readonly EsportDataContext context;

        public ConfirmAdminHandler(EsportDataContext context)
        {
            this.context = context;
        }

        public async Task<CommandResult> HandleCommandAsync(ConfirmAdmin command)
        {
            var organisationAdministrator = await context.OrganisationAdministrators.FirstOrDefaultAsync(x => x.UserId == command.UserId);
            if (organisationAdministrator == null) { throw new ApplicationException("No org admin is found for user id: " + command.UserId); }
            organisationAdministrator.IsConfirmed = true;
            await context.SaveChangesAsync();
            return new CommandResult(1);
        }
    }
}
