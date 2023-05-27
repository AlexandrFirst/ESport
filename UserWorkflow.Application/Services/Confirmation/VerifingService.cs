using Castle.Core.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Configs;
using UserWorkflow.Application.Utils;
using UserWorkflow.Esport;
using UserWorkflow.Infrastructure.Security;

namespace UserWorkflow.Application.Services.Confirmation
{
    public class VerifingService : IVerifingService
    {
        private readonly EsportDataContext esportDataContext;
        private readonly ConfirmationOption confirmationOptions;

        public VerifingService(EsportDataContext esportDataContext,
            IOptions<ConfirmationOption> confirmationOptions)
        {
            this.esportDataContext = esportDataContext;
            this.confirmationOptions = confirmationOptions.Value;
        }

        public async Task<bool> VerifyUserProfileEmail(string token)
        {
            if (string.IsNullOrEmpty(token))
            {
                throw new ApplicationException("Token to confirm is null");
            }

            try
            {
                var tokenClaims = JwtHelper.DecodeClaims(confirmationOptions.Secret, token);

                var roleName = tokenClaims.First(x => x.Key == ClaimTypes.Role).Value;
                var userId = int.Parse(tokenClaims.First(x => x.Key == "UserId").Value);
                if (roleName.Equals("OrgAdmin"))
                {
                    var orgAdmin = await esportDataContext.OrganisationAdministrators.FirstOrDefaultAsync(x => x.UserId == userId);
                    if (orgAdmin == null) { throw new ApplicationException("Unable to get org admin with id: " + userId); }
                    orgAdmin.IsProfileConfirmed = true;
                }
                else if (roleName.Equals("LocalAdmin"))
                {
                    var admin = await esportDataContext.Administrators.FirstOrDefaultAsync(x => x.UserId == userId);
                    if (admin == null) { throw new ApplicationException("Unable to get org admin with id: " + userId); }
                    admin.IsProfileConfirmed = true;
                }
                else if (roleName.Equals("Trainer"))
                {
                    var trainer = await esportDataContext.Trainers.FirstOrDefaultAsync(x => x.UserId == userId);
                    if (trainer == null) { throw new ApplicationException("Unable to get org admin with id: " + userId); }
                    trainer.IsProfileConfirmed = true;
                }
                else if (roleName.Equals("Trainee")) 
                {
                    var trainee = await esportDataContext.Trainees.FirstOrDefaultAsync(x => x.UserId == userId);
                    if (trainee == null) { throw new ApplicationException("Unable to get trainee with id: " + userId); }
                    trainee.IsProfileConfirmed = true;
                }
                else
                {
                    throw new ApplicationException("The role: " + roleName + " can not be updated");
                }
                await esportDataContext.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw new ApplicationException(ex.Message);
            }
        }
    }
}
