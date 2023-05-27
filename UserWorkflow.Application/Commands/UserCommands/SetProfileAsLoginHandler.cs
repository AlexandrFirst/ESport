using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Clients;
using UserWorkflow.Esport;
using UserWorkFlow.Infrastructure.Commands;

namespace UserWorkflow.Application.Commands.UserCommands
{
    public class SetProfileAsLoginHandler : ICommandHandler<SetProfileAsLogin>
    {
        private readonly EsportDataContext esportDataContext;
        private readonly IdentityClient identityClient;

        public SetProfileAsLoginHandler(EsportDataContext esportDataContext, IdentityClient identityClient)
        {
            this.esportDataContext = esportDataContext;
            this.identityClient = identityClient;
        }

        public async Task<CommandResult> HandleCommandAsync(SetProfileAsLogin command)
        {
            Esport.Models.User userProfileToSetAsLogin = null;
            var userId = command.AuthenticatedBy.UserId;

            switch (command.UserTypeProfile)
            {
                case Esport.Models.UserTypeEntity.Trainee:
                    userProfileToSetAsLogin = await esportDataContext.Trainees.FirstOrDefaultAsync(x => x.UserId == userId);
                    break;
                case Esport.Models.UserTypeEntity.Trainer:
                    userProfileToSetAsLogin = await esportDataContext.Trainers.FirstOrDefaultAsync(x => x.UserId == userId);
                    break;
                case Esport.Models.UserTypeEntity.Organisator:
                    userProfileToSetAsLogin = await esportDataContext.OrganisationAdministrators.FirstOrDefaultAsync(x => x.UserId == userId);
                    break;
                case Esport.Models.UserTypeEntity.Admin:
                    userProfileToSetAsLogin = await esportDataContext.Administrators.FirstOrDefaultAsync(x => x.UserId == userId);
                    break;
                default:
                    throw new ApplicationException("Unable to set login profle for profile type: " + command.UserTypeProfile.ToString());
            }

            if (userProfileToSetAsLogin == null)
            {
                throw new ApplicationException($"Profile {command.UserTypeProfile.ToString()} is not found for user id: {userId}");
            }

            if (!userProfileToSetAsLogin.IsProfileConfirmed || string.IsNullOrWhiteSpace(userProfileToSetAsLogin.Email)) 
            {
                throw new ApplicationException($"Unable to set login for uncomfirmed profile or profile without email");
            }

            var identityUpdateResponse = await identityClient.UpdateUserProfile(new Models.User.UpdateUserInfo()
            {
                UserId = userId,
                Email = userProfileToSetAsLogin.Email,
                Name = userProfileToSetAsLogin.Name,
                Surname = userProfileToSetAsLogin.Surname,
                TelephoneNumber = userProfileToSetAsLogin.TelephoneNumber,
            });

            return new CommandResult(1);
        }
    }
}
