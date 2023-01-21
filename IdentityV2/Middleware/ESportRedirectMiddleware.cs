using IdentityV2.CustomAttrubutes;
using IdentityV2.Infrastructure.Core;
using IdentityV2.Infrastructure.Implementation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Primitives;
using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace IdentityV2.Middleware
{
    public class ESportRedirectMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IWebHostEnvironment webHostEnvironment;

        public ESportRedirectMiddleware(RequestDelegate next, IWebHostEnvironment webHostEnvironment)
        {
            _next = next;
            this.webHostEnvironment = webHostEnvironment;
        }

        public async Task InvokeAsync(HttpContext ctx)
        {
            var ep = ctx.Features.Get<IEndpointFeature>()?.Endpoint;

            var eSportAuth = ep?.Metadata?.GetMetadata<ESportIdentityAttribute>();
            var authAttr = ep?.Metadata?.GetMetadata<AuthorizeAttribute>();

            if (eSportAuth != null)
            {
                var authService = ctx.RequestServices.GetRequiredService<IJWTManagerRepository>();
                var result = authService.Authorize(ctx.UserAvatar);

                if (!result.Success)
                {
                    var postbackUrlStringValues = new StringValues(); //specify landing of the site
                    bool success = ctx.Request.Query.TryGetValue("postbackUrl", out postbackUrlStringValues);

                    var postbackUrl = success ? Convert.ToBase64String(Encoding.UTF8.GetBytes(postbackUrlStringValues.First())) : "";

                    if (webHostEnvironment.IsDevelopment())
                    {
                        var path = $"http://localhost:5000/Account/login?postBackUrl=" + postbackUrl;
                        ctx.Response.Redirect(path);
                    }
                    else
                    {
                        var path = $"http://host.docker.internal:5000/Account/login?postBackUrl=" + postbackUrl;
                        ctx.Response.Redirect(path);
                    }
                    return;
                }
            }

            if (authAttr != null && !string.IsNullOrEmpty(authAttr.Policy))
            {
                var authService = ctx.RequestServices.GetRequiredService<IAuthorizationService>();
                var result = await authService.AuthorizeAsync(ctx.UserAvatar, ctx.GetRouteData(), authAttr.Policy);

                if (!result.Succeeded)
                {
                    ctx.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                    return;
                }
            }
            await _next(ctx);
        }
    }
}
