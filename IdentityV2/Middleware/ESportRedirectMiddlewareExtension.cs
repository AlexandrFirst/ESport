using Microsoft.AspNetCore.Builder;

namespace IdentityV2.Middleware
{
    public static class ESportRedirectMiddlewareExtension
    {
        public static IApplicationBuilder UseRedirectMiddleware(
       this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ESportRedirectMiddleware>();
        }
    }
}
