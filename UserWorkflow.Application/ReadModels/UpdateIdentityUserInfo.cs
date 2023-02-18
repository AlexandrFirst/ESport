using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserWorkflow.Application.ReadModels
{
    public enum UserRoleMode { Delete, Add}

    public class UserRoleData 
    {
        public string RoleName { get; set; }
        public UserRoleMode UserRoleMode { get; set; } 
    }

    public class UpdateIdentityUserInfo
    {
        public UserInfo UserInfo { get; set; }
        public List<UserRoleData> UserRoleDatas { get; set; }
    }
}
