using OcelotAuthClient;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace UserWorkFlow.Infrastructure.Security
{
    public class AuthorizedBy
    {
        public ClaimsPrincipal User { get; private set; }

        public AuthorizedBy()
        {

        }
        public AuthorizedBy(int userId, string role, string name, string email)
        {
            UserId = userId;
            Role = role;
            Name = name;
            Email = email;
        }

        public void SetClaimsPrinciple(ClaimsPrincipal principal)
        {
            User = principal;
        }

        public void SetAuthProperty(AuthRequestData authRequestData, string value)
        {
            switch (authRequestData.authClaims)
            {
                case AuthClaims.Id:
                    UserId = int.Parse(value);
                    break;
                case AuthClaims.Name:
                    Name = value;
                    break;
                case AuthClaims.Role:
                    Role = value;
                    break;
                case AuthClaims.Email:
                    Email = value;
                    break;
                default:
                    break;
            }
        }

        public int UserId { get; private set; }
        public string Role { get; private set; }
        public string Name { get; private set; }
        public string Email { get; private set; }
    }
}
