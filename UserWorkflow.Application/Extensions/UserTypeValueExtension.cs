using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Esport.Models;
using UserWorkflow.Infrastructure.Security;

namespace UserWorkflow.Application.Extensions
{
    public static class UserTypeValueExtension
    {
        public static bool Contains(this UserTypeEntity userTypeEntity, UserTypeEntity other) 
        {
            return (userTypeEntity & other) == other;        
        }

        public static UserRole GetRole(this UserTypeEntity userTypeEntity) 
        {
            switch (userTypeEntity)
            {
                case UserTypeEntity.None:
                    throw new ApplicationException("Unable to determine userrole for UserTypeEntity.None");
                case UserTypeEntity.Trainee:
                    return UserRole.Trainee;
                case UserTypeEntity.Trainer:
                    return UserRole.Trainer;
                case UserTypeEntity.Organisator:
                    return UserRole.OrgAdmin;
                case UserTypeEntity.Admin:
                    return UserRole.LocalAdmin;
                default:
                    throw new ApplicationException($"Unable to determine userrole for {userTypeEntity.ToString()}");
            }
        }
    }
}
