using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserWorkflow.Application.ReadModels.User
{
    public class UserInfo
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Telephone { get; set; }
    }

    public class UpdateUserInfo : UserInfo
    {
        public int UserId { get; set; }
        public bool OverrideIdentityInfo { get; set; }
    }
}
