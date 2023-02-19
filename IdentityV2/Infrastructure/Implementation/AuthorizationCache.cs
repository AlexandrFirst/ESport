using IdentityV2.Infrastructure.Core;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Threading.Tasks;

namespace IdentityV2.Infrastructure.Implementation
{
    public class AuthorizationCache : IAuthorizationCache
    {
        private readonly IMemoryCache memoryCache;

        public AuthorizationCache(IMemoryCache memoryCache)
        {
            this.memoryCache = memoryCache;
        }

        public bool AddUserToCache(int userId, string token)
        {
            RemoveUserFromCache(userId);
            var memoryCacheOptions = new MemoryCacheEntryOptions()
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromDays(1),
            };

            memoryCache.Set(userId, token, memoryCacheOptions);
            return true;
        }

        public string CheckUserTokenInCache(int userId)
        {
            var userTokenExists = memoryCache.TryGetValue(userId, out var userToken);
            if (!userTokenExists)
            {
                throw new Exception("User token is not found");
            }

            return userToken.ToString();
        }

        public bool RemoveUserFromCache(int userId)
        {
            var userTokenExists = memoryCache.TryGetValue(userId, out var userToken);
            if (userTokenExists)
            {
                memoryCache.Remove(userId);
            }
            return true;
        }
    }
}
