using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserWorkflow.Infrastructure.Security
{
    public class UserRole
    {
        public static UserRole Trainer = new UserRole("Trainer", 3);
        public static UserRole Trainee = new UserRole("Trainee", 4);
        public static UserRole OrgAdmin = new UserRole("OrgAdmin", 1);
        public static UserRole LocalAdmin = new UserRole("LocalAdmin", 2);

        public string RoleName { get; set; }
        public int RoleId { get; set; }
        
        private UserRole(string roleName, int roleId)
        {
            RoleName = roleName;
            RoleId = roleId;
        }
    }
}
