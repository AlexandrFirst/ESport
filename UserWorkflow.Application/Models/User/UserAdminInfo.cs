using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserWorkflow.Application.Models.User
{
    public class GymInfo 
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public TimeSpan OpenTime { get; set; }
        public TimeSpan CloseTime { get; set; }
        public int? GymOrganisationId { get; set; }
        public string OrganisationName { get; set; }
    }

    public class UserAdminInfo: UserIdentityInfo
    {
        public int Id { get; set; }
        public List<GymInfo> UserGyms { get; set; }
    }
}
