using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Base;
using UserWorkflow.Application.Models.Organisation;

namespace UserWorkflow.Application.Requests.Organisation
{
    public class GetOrganisationListing: BaseRequest
    {
        public OrganisationInfoFiltration OrganisationFiltration { get; set; }
    }

    public class GetOrganisationListingResult
    {
        public OrganisationInfoListing OrganisationInfoListing { get; set; }
    }
}
