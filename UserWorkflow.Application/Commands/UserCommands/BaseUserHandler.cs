using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.ReadModels.User;

namespace UserWorkflow.Application.Commands.User
{
    public abstract class BaseUserHandler
    {
        protected T createUser<T>(UpdateUserInfo newAdminInfo, bool isProfileConfirmed) where T : UserWorkflow.Esport.Models.User, new()
        {
            var administrator = new T()
            {
                Email = newAdminInfo.Email,
                Name = newAdminInfo.Name,
                Surname = newAdminInfo.Surname,
                TelephoneNumber = newAdminInfo.Telephone,
                UserId = newAdminInfo.UserId,
                IsProfileConfirmed = isProfileConfirmed
            };

            return administrator;
        }

        protected bool needConfirmation(UpdateUserInfo userInfo, string oldEmail) 
        {
            var isCurrentMail = !string.IsNullOrEmpty(userInfo.Email);
            if (!isCurrentMail) { return false; }
            var isOldEmail = !string.IsNullOrEmpty(oldEmail);
            if (!isOldEmail) { return true; }

            return !userInfo.Email.Equals(oldEmail);
        }
    }
}
