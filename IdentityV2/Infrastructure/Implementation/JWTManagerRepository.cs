using IdentityV2.Dto.User;
using IdentityV2.Infrastructure.Core;
using IdentityV2.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace IdentityV2.Infrastructure.Implementation
{
    public class JWTManagerRepository : IJWTManagerRepository
    {
        private readonly IConfiguration iconfiguration;
        public JWTManagerRepository(IConfiguration iconfiguration)
        {
            this.iconfiguration = iconfiguration;
        }

        public Tokens Authenticate(UserLoginDto users)
        {
            // Else we generate JSON Web Token
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.UTF8.GetBytes(iconfiguration["JWT:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim("Name", users.Mail)
                }),
                Expires = DateTime.UtcNow.AddMinutes(10),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return new Tokens { Token = tokenHandler.WriteToken(token) };
        }

        public ESportAuthorizationResult Authorize(ClaimsPrincipal user)
        {
           var isAuthentificatedClaim = user.Claims.FirstOrDefault(x => x.Type == "IsAuthentificated");
            if (isAuthentificatedClaim != null) 
            {
                var isAuthentificated = bool.Parse(isAuthentificatedClaim.Value);
                if (isAuthentificated) 
                {
                    return new ESportAuthorizationResult() { Success = true };
                }
            }
            return new ESportAuthorizationResult() { Success = false };
        }
    }
}
