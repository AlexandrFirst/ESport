using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Models.Organisation;

namespace UserWorkflow.Application.Services.Organisation
{
    public interface IOrganisationService
    {
        public Task<OrganisationInfoListing> GetOrganisationListing(OrganisationInfoFiltration organisationInfoFiltration);
    }
}
