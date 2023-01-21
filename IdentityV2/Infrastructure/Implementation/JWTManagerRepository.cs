using IdentityV2.Data;
using IdentityV2.Data.Utils;
using IdentityV2.Dto.UserAvatar;
using IdentityV2.Infrastructure.Core;
using IdentityV2.Models;
using IdentityV2.Utils;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace IdentityV2.Infrastructure.Implementation
{
    public class JWTManagerRepository : IJWTManagerRepository
    {
        private readonly IConfiguration iconfiguration;
        private readonly IdentityDataContext context;

        public JWTManagerRepository(IConfiguration iconfiguration, IdentityDataContext context)
        {
            this.iconfiguration = iconfiguration;
            this.context = context;
        }

        public async Task<Tokens> AuthenticateAsync(UserLoginDto userLogin)
        {
            var secretKey = iconfiguration.GetSection("UserAvatar")["Key"];

            var passwordHelper = new PasswordHelper(secretKey);


            var dbUser = await context.Users.FirstOrDefaultAsync(x => x.Email == userLogin.Mail && x.IsPending == false);
            bool isPasswordCorrect = false;
            if (dbUser != null)
            {
                var dbPassword = dbUser.HashedPassword;
                var inputPassword = userLogin.Password;
                isPasswordCorrect = passwordHelper.Verify(inputPassword, dbPassword);
            }

            if (!isPasswordCorrect) { return null; }

            var tokenHandler = new JwtSecurityTokenHandler();

            var tokenKey = Encoding.UTF8.GetBytes(iconfiguration["JWT:Key"]);
            var audience = iconfiguration.GetSection("JWT")["Audience"];
            var issuer = iconfiguration.GetSection("JWT")["Issuer"];

            var userRolesEnumerable = dbUser.UserRoles.Select(x => x.Role.Title);
            string userRoles = "";
            if (userRolesEnumerable.Any())
            {
                userRoles = userRolesEnumerable.Aggregate((acc, s) => string.IsNullOrEmpty(acc) ? s : acc + "," + s);
            }

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(UserClaims.Id, dbUser.Id.ToString()),
                    new Claim(UserClaims.Role,  userRoles),
                    new Claim(UserClaims.Surname, dbUser.Surname),
                    new Claim(UserClaims.Email, dbUser.Email),
                    new Claim(UserClaims.Name, dbUser.Name),
                }),
                Expires = DateTime.UtcNow.AddMinutes(360),
                Audience = audience,
                Issuer = issuer,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return new Tokens { Token = tokenHandler.WriteToken(token) };
        }

        public ESportAuthorizationResult Authorize(ClaimsPrincipal userSlice)
        {
           var isAuthentificatedClaim = userSlice.Claims.FirstOrDefault(x => x.Type == "IsAuthentificated");
            if (isAuthentificatedClaim != null)
            {
                var isAuthentificated = bool.Parse(isAuthentificatedClaim.Value);
                if (!isAuthentificated)
                {
                    return new ESportAuthorizationResult() { Success = false };
                }
            }
            return new ESportAuthorizationResult() { Success = true };
        }
    }
}
