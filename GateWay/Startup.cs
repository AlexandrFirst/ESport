using ESportAuthClient.ESportAuthClient;
using FluentValidation.Internal;
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
using Newtonsoft.Json;
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
using System.Text;
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

            services.AddCors(options => options.AddPolicy("ESportCors", builder =>
            {
                builder.WithOrigins("http://localhost:4200")
                       .AllowAnyMethod()
                       .AllowAnyHeader()
                       .AllowCredentials();
            }));

            services.AddControllers();

            services.AddAuthentication(o =>
            {
                o.DefaultAuthenticateScheme = "ESport";
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
                        try
                        {
                            await next.Invoke();
                        }
                        catch (Exception ex) 
                        {
                            context.Response.StatusCode = 500;

                            var messageError = new
                            {
                                Message = ex.Message
                            };

                            await context.Response.BodyWriter.WriteAsync(Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(messageError)));
                            return;
                        }
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

            app.UseCors("ESportCors");
            app.UseAuthentication();

            app.UseWebSockets();
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
