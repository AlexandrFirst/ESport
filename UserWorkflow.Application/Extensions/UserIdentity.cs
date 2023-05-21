using OcelotAuthClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using UserWorkFlow.Infrastructure.Security;

namespace UserWorkflow.Application.Extensions
{
    public static class UserIdentity
    {
        public static bool TryValidateUserClaims(this ClaimsPrincipal userPrincipal, out AuthorizedBy authorizedBy)
        {
            var claimListToRetrieve = new List<AuthRequestData>() { AuthRequestData.Id, AuthRequestData.Name, AuthRequestData.Email, AuthRequestData.Role };
            authorizedBy = new AuthorizedBy();
            authorizedBy.SetClaimsPrinciple(userPrincipal);
            foreach (var claim in claimListToRetrieve)
            {
                var isClaimExists = tryGetClaimValue(userPrincipal.Claims, claim, out var value);
                if (isClaimExists) 
                {
                    authorizedBy.SetAuthProperty(claim, value);
                }
                else
                {
                    authorizedBy = null;
                    return false;
                }
            }
            return true;

        }

        private static bool tryGetClaimValue(IEnumerable<Claim> userClaims, AuthRequestData value, out string claimValue)
        {
            var userClaim = userClaims.FirstOrDefault(x => x.Type == value.Value);
            if (userClaim == null)
            {
                claimValue = string.Empty;
                return false;
            }

            claimValue = userClaim.Value;
            return true;
        }
    }
}
