using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Esport;
using UserWorkFlow.Infrastructure.Commands;

namespace UserWorkflow.Application.Commands.OrgAdminCommands
{
    public class DeleteOrganisationHandler : ICommandHandler<DeleteOrganisation>
    {
        private readonly EsportDataContext esportDataContext;

        public DeleteOrganisationHandler(EsportDataContext esportDataContext)
        {
            this.esportDataContext = esportDataContext;
        }

        public async Task<CommandResult> HandleCommandAsync(DeleteOrganisation command)
        {
            var orgToDelete = await esportDataContext.Organisations.FirstOrDefaultAsync(x => x.Id == command.OrganisationId);
            if (orgToDelete == null) 
            {
                throw new ApplicationException($"Organisation with id: {command.OrganisationId}");
            }

            esportDataContext.Organisations.Remove(orgToDelete);

            await esportDataContext.SaveChangesAsync();
            return new CommandResult(1);
        }
    }
}
