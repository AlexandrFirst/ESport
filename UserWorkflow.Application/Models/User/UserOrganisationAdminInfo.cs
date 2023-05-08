using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserWorkflow.Application.Models.User
{
    public class UserOrganisationAdminInfo: UserIdentityInfo
    {
        public int Id { get; set; }
        public int? GymOrganisationId { get; set; }
        public string OrganisationName { get; set; }

        public UserOrganisationAdminInfo(UserIdentityInfo userIdentityInfo): base(userIdentityInfo)
        {

        }

        public UserOrganisationAdminInfo()
        {

        }
    }
}
