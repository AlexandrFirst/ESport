using IdentityV2.Dto.User;
using IdentityV2.Models;
using System.Security.Claims;

namespace IdentityV2.Infrastructure.Core
{
    public interface IJWTManagerRepository
    {
        Tokens Authenticate(UserLoginDto users);
        ESportAuthorizationResult Authorize(ClaimsPrincipal user);
    }
}
