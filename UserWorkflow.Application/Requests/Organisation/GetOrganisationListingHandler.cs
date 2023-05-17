using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Services.Organisation;
using UserWorkFlow.Infrastructure.Queries;

namespace UserWorkflow.Application.Requests.Organisation
{
    public class GetOrganisationListingHandler : IRequestHandler<GetOrganisationListing, GetOrganisationListingResult>
    {
        private readonly IOrganisationService organisationService;

        public GetOrganisationListingHandler(IOrganisationService organisationService)
        {
            this.organisationService = organisationService;
        }

        public async Task<RequestResult<GetOrganisationListingResult>> HandleQueryAsync(GetOrganisationListing request)
        {
            if (request.OrganisationFiltration == null) 
            {
                throw new ArgumentException("Organisation filtration can not be null", nameof(request.OrganisationFiltration));
            }

            var result = await organisationService.GetOrganisationListing(request.OrganisationFiltration);
            return new RequestResult<GetOrganisationListingResult>(new GetOrganisationListingResult() { OrganisationInfoListing = result });
        }
    }
}
