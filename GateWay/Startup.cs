using ESportAuthClient.ESportAuthClient;
using GateWay.Errors;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using Ocelot.Configuration;
using Ocelot.DependencyInjection;
using Ocelot.Errors;
using Ocelot.Middleware;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using MediaClient.Middleware;
using MediaClient.Services;

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
                builder.WithOrigins("http://localhost:3000", "https://localhost:3000", "http://localhost:6005", "http://localhost:4200",
                    "https://e-sport.cloud", "https://e-sport.cloud:4201", "https://localhost", "https://localhost:443", "https://localhost:80",
                    "https://localhost:4201")
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
            MediaClient.Bootstrapper.RegisterIocContainers(services, Configuration);
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            var configuration = new OcelotPipelineConfiguration
            {
                AuthorisationMiddleware = async (context, next) =>
                {
                    var captchaService = app.ApplicationServices.GetRequiredService<ICaptchaClient>();

                    if (this.Authorize(context))
                    {
                        try
                        {
                            var isAuthorizationPresent = context.Request.Headers.TryGetValue("Authorization", out var authorization);

                            var isCaptchaValid = await captchaService.ValidateHttpContext(context);
                            var isRequestValid = isCaptchaValid && isAuthorizationPresent;

                            if (isRequestValid || !isAuthorizationPresent)
                            {
                                Console.WriteLine("Before: " + context.Request.Path);
                                await next.Invoke();
                                Console.WriteLine("After: " + context.Request.Path);
                            }
                            else
                            {
                                throw new ApplicationException("Request is send by bot");
                            }
                            
                        }
                        catch (Exception ex)
                        {
                            context.Response.StatusCode = 500;
                            var messageError = new
                            {
                                Message = ex.Message + " | " + ex.StackTrace
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

            app.UseGoogleServices();

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
