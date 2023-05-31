using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Models.Gym;

namespace UserWorkflow.Application.Models.Organisation
{
    public class OrganisationInfoReadModel
    {
        public int OrganisationId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<GymReadInfo> OrganisationGymInfos { get; set; }
        public List<OrganisationAdministartorReadModel> OrganisationAdministartors { get; set; }
    }
}
