using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Base;
using UserWorkflow.Application.Models.User;

namespace UserWorkflow.Application.Requests.User
{
    public class GetUser : BaseRequest
    {
        [Required]
        public int UserId { get; set; }
    }

    public class GetUserResult
    {
        public UserIdentityInfo UserIdentityInfo { get; set; }
        public UserTraineeInfo UserTraineeInfo { get; set; }
        public UserTrainerInfo UserTrainerInfo { get; set; }
        public UserAdminInfo UserAdminInfo { get; set; }
        public List<UserOrganisationAdminInfo> UserOrganisationAdminInfos { get; set; }
    }
}
