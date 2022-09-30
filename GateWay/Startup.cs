using ESportAuthClient.ESportAuthClient;
using GateWay.Errors;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Ocelot.Authorisation;
using Ocelot.Configuration;
using Ocelot.DependencyInjection;
using Ocelot.DownstreamRouteFinder;
using Ocelot.Errors;
using Ocelot.Middleware;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace GateWay
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddAuthentication(o =>
            {
                o.DefaultAuthenticateScheme = "ESp`ort";
                o.DefaultChallengeScheme = "ESport";
            })
            .AddScheme<ESportClientAuthenticationOptions, ESportClientAuthenticationHandler>("ESport", o => { o.Authority = Configuration.GetSection("Security")["Authority"]; });

            services.AddOcelot();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            var configuration = new OcelotPipelineConfiguration
            {
                AuthorisationMiddleware = async (context, next) =>
                {
                    if (this.Authorize(context))
                    {
                        await next.Invoke();
                    }
                    else
                    {
                        context.Items.SetError(new UnothorizedError("Error on authorization", OcelotErrorCode.ClaimValueNotAuthorisedError, 403));
                        return;
                    }
                }
            };

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseOcelot(configuration).Wait();
        }

        private bool Authorize(HttpContext ctx)
        {
            DownstreamReRoute route = (DownstreamReRoute)ctx.Items["DownstreamReRoute"];
            string key = route.AuthenticationOptions.AuthenticationProviderKey;
            if (key == null || key == "") return true;
            if (route.RouteClaimsRequirement.Count == 0) return true;

            bool auth = false;
            Claim[] claims = ctx.User.Claims.ToArray<Claim>();
            Dictionary<string, string> required = route.RouteClaimsRequirement;
            var routeRoleInfo = required["Role"];
            var userRoleInfo = claims.FirstOrDefault(x => x.Type == "Role");
            if (userRoleInfo == null) auth = false;
            else
            {
                var routeRoles = routeRoleInfo.Split(',');
                var userRoles = userRoleInfo.Value.Split(',');
                auth = routeRoles.Any(x => userRoles.Any(y => y == x));
            }

            return auth;
        }
    }
}
