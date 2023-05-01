using AutoMapper;
using Castle.Core.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Models.Organisation;
using UserWorkflow.Esport;
using UserWorkflow.Esport.Models;
using UserWorkFlow.Infrastructure.Commands;

namespace UserWorkflow.Application.Commands.OrgAdminCommands
{
    public class UpdateOrganisationHandler : ICommandHandler<UpdateOrganisation>
    {
        private readonly EsportDataContext esportDataContext;
        private readonly ILogger<UpdateOrganisationHandler> logger;
        private readonly IMapper mapper;

        public UpdateOrganisationHandler(EsportDataContext esportDataContext,
            ILogger<UpdateOrganisationHandler> logger, IMapper mapper)
        {
            this.esportDataContext = esportDataContext;
            this.logger = logger;
            this.mapper = mapper;
        }

        public async Task<CommandResult> HandleCommandAsync(UpdateOrganisation command)
        {
            var organisationToUpdate = await esportDataContext.Organisations.FirstOrDefaultAsync(x => x.Id == command.OrganisationId);
            if (organisationToUpdate == null)
            {
                string errMessage = $"Organisation with id {command.OrganisationId} is not found";
                logger.LogError(errMessage);
                throw new ApplicationException(errMessage);
            }
            var errors = command.OrganisationInfo.Validate();
            if (errors.Any())
            {
                throw new ApplicationException(string.Join(',', errors));
            }

            mapper.Map<SimpleOrgansiationInfo, Organisation>(command.OrganisationInfo, organisationToUpdate);

            await handleGyms(command.OrganisationGyms, organisationToUpdate);

            await esportDataContext.SaveChangesAsync();

            return new CommandResult(organisationToUpdate.Id);
        }

        private async Task handleGyms(List<GymInfo> organisationGyms, Organisation organisation)
        {
            var gymsToDelete = organisation.Gyms.Where(x => !organisationGyms.Any(g => x.Id == g.Id));
            var gymsToAdd = organisationGyms.Where(x => !organisation.Gyms.Any(g => x.Id == g.Id));
            var gymsToUpdate = organisation.Gyms.Join(organisationGyms, x => x.Id, x => x.Id, (n, o) => new
            {
                OldGym = o,
                NewGym = n,
            }).ToList();

            esportDataContext.RemoveRange(gymsToDelete);

            var n_gymsToAdd = mapper.Map<List<UserWorkflow.Esport.Models.Gym>>(gymsToAdd);
            await esportDataContext.AddRangeAsync(n_gymsToAdd);

            foreach (var g_info in gymsToUpdate)
            {
                mapper.Map(g_info.NewGym, g_info.OldGym);
            }
        }
    }
}
