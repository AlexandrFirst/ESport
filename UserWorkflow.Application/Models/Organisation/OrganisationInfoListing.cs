using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Models.Base;

namespace UserWorkflow.Application.Models.Organisation
{
    public class OrganisationInfoListing: BaseListing
    {
        public List<OrganisationInfoReadModel> OrganisatationInfoListing { get; set; }
    }
}
