using System.Threading.Tasks;

namespace IdentityV2.Infrastructure.Core
{
    public interface IAuthorizationCache
    {
        public bool AddUserToCache(int userId, string value);
        public bool RemoveUserFromCache(int userId);
        public string CheckUserTokenInCache(int userId);
    }
}
