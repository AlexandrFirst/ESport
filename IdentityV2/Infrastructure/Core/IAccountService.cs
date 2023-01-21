using IdentityV2.Dto.UserAvatar;
using IdentityV2.Models;
using IdentityV2.Models.AccountModels;
using System.Threading.Tasks;

namespace IdentityV2.Infrastructure.Implementation
{
    public interface IAccountService
    {
        public Task<Tokens> Login(UserLoginDto userLoginDto);
        public Task<RegisterResultModel> Register(RegisterModel registerModel);
        public Task<bool> ConfirmRegistration(string token);
    }
}
