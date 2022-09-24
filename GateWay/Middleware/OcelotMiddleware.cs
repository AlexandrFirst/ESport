using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Ocelot.Logging;
using System.Threading.Tasks;

namespace GateWay.Middleware
{
    public class OcelotMiddleware /*: Ocelot.Middleware.OcelotMiddleware*/
    {
        //public OcelotMiddleware(OcelotRequestDelegate next, IConfiguration configuration, IMemoryCache memoryCache, IOcelotLogger logger) : base(logger)
        //{
        //}

        //public async Task Invoke(DownstreamContext context)
        //{
        //    var permissions = await _memoryCache.GetOrCreateAsync("ApiPermissions", async entry =>
        //    {
        //        using (var conn = new SqlConnection(_configuration.GetConnectionString("ApiPermissions")))
        //        {
        //            entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(1);
        //            return (await conn.QueryAsync<ApiPermission>("SELECT * FROM dbo.ApiPermissions")).ToArray();
        //        }
        //    });

        //    var result = await context.HttpContext.AuthenticateAsync(context.DownstreamReRoute.AuthenticationOptions.AuthenticationProviderKey);
        //    context.HttpContext.User = result.Principal;

        //    var user = context.HttpContext.User;
        //    var request = context.HttpContext.Request;

        //    var permission = permissions.FirstOrDefault(p =>
        //        request.Path.Value.Equals(p.PathPattern, StringComparison.OrdinalIgnoreCase) && p.Method.ToUpper() == request.Method.ToUpper());

        //    if (permission == null)//Can't match exactly, then match according to regular
        //    {
        //        permission =
        //            permissions.FirstOrDefault(p =>
        //                Regex.IsMatch(request.Path.Value, p.PathPattern, RegexOptions.IgnoreCase) && p.Method.ToUpper() == request.Method.ToUpper());
        //    }

        //    if (!user.Identity.IsAuthenticated)
        //    {
        //        if (permission != null && string.IsNullOrWhiteSpace(permission.AllowedRoles))//You need to log in to access by default
        //        {
        //            //context.HttpContext.User = new ClaimsPrincipal(new ClaimsIdentity(new[] {new Claim(ClaimTypes.Name, "Anonymous") }, context.DownstreamReRoute.AuthenticationOptions.AuthenticationProviderKey));
        //        }
        //        else
        //        {
        //            SetPipelineError(context, new UnauthenticatedError("unauthorized, need login"));
        //            return;
        //        }
        //    }
        //    else
        //    {
        //        if (!string.IsNullOrWhiteSpace(permission?.AllowedRoles) &&
        //            !permission.AllowedRoles.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries).Any(r => user.IsInRole(r)))
        //        {
        //            SetPipelineError(context, new UnauthorisedError("forbidden, have no permission"));
        //            return;
        //        }
        //    }

        //    await _next.Invoke(context);
        //}
    }
}
