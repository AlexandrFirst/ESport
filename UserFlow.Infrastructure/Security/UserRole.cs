using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserWorkflow.Infrastructure.Security
{
    public class UserRole
    {
        public static UserRole Trainer = new UserRole("Trainer");
        public static UserRole Trainee = new UserRole("Trainee");
        public static UserRole OrgAdmin = new UserRole("OrgAdmin");
        public static UserRole LocalAdmin = new UserRole("LocalAdmin");

        public string RoleName { get; set; }

        private UserRole(string roleName)
        {
            RoleName = roleName;
        }   
    }
}
