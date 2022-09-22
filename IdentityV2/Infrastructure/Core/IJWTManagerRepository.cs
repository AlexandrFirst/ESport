using IdentityV2.Dto.User;
using IdentityV2.Models;
using System.Security.Claims;
using System.Threading.Tasks;

namespace IdentityV2.Infrastructure.Core
{
    public interface IJWTManagerRepository
    {
        Task<Tokens> AuthenticateAsync(UserLoginDto users);
        ESportAuthorizationResult Authorize(ClaimsPrincipal user);
    }
}
