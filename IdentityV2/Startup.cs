using IdentityV2.CustomAttrubutes;
using IdentityV2.CustomAuth;
using IdentityV2.Data;
using IdentityV2.Infrastructure.Core;
using IdentityV2.Infrastructure.Implementation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace IdentityV2
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();
            services.AddAuthentication(o =>
            {
                o.DefaultAuthenticateScheme = "ESport";
                o.DefaultChallengeScheme = "ESport";
            })
            .AddScheme<ESportAuthenticationOptions, ESportAuthenticationHandler>("ESport", o => { });


            //db user: name=esdb; pass=1q2w3e4r

            services.AddDbContext<IdentityDataContext>(options => options.UseSqlServer(Configuration.GetConnectionString("IdentityDb")));

            services.AddScoped<IJWTManagerRepository, JWTManagerRepository>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles();
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.Use(async (ctx, next) =>
            {
                var ep = ctx.Features.Get<IEndpointFeature>()?.Endpoint;

                var eSportAuth = ep?.Metadata?.GetMetadata<ESportIdentityAttribute>();
                var authAttr = ep?.Metadata?.GetMetadata<AuthorizeAttribute>();

                if (eSportAuth != null)
                {
                    var authService = ctx.RequestServices.GetRequiredService<JWTManagerRepository>();
                    var result = authService.Authorize(ctx.User);

                    if (!result.Success)
                    {
                        var path = $"/login";
                        ctx.Response.Redirect(path);
                        return;
                    }
                }

                if (authAttr != null)
                {
                    var authService = ctx.RequestServices.GetRequiredService<IAuthorizationService>();
                    var result = await authService.AuthorizeAsync(ctx.User, ctx.GetRouteData(), authAttr.Policy);

                    if (!result.Succeeded)
                    {
                        ctx.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                        return;
                    }
                }
                await next();
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");

                endpoints.MapControllers();
            });
        }
    }
}
