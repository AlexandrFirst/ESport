using Castle.Core.Logging;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Esport;
using UserWorkflow.Esport.Models;
using UserWorkFlow.Infrastructure.Commands;

namespace UserWorkflow.Application.Commands.OrgAdminCommands
{
    public class CreateOrganisationHandler : ICommandHandler<CreateOrganisation>
    {
        private readonly EsportDataContext esportDataContext;
        private readonly ILogger<CreateOrganisationHandler> logger;

        public CreateOrganisationHandler(EsportDataContext esportDataContext, ILogger<CreateOrganisationHandler> logger)
        {
            this.esportDataContext = esportDataContext;
            this.logger = logger;
        }

        public async Task<CommandResult> HandleCommandAsync(CreateOrganisation command)
        {
            var organisationToInsert = new Organisation() { Name = command.Name, Description = command.Description };
            try
            {
                await esportDataContext.Organisations.AddAsync(organisationToInsert);
            }
            catch (Exception ex)
            {
                var message = $"{ex.Message}|{ex.InnerException.Message}";
                logger.LogError(message);
                throw new ApplicationException(message);
            }

            await esportDataContext.SaveChangesAsync();

            return new CommandResult(organisationToInsert.Id);
        }
    }
}
