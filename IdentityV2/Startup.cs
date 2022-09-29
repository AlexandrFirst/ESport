using IdentityV2.CustomAttrubutes;
using IdentityV2.CustomAuth;
using IdentityV2.Data;
using IdentityV2.Infrastructure.Core;
using IdentityV2.Infrastructure.Implementation;
using IdentityV2.Middleware;
using IdentityV2.Utils;
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
using Microsoft.Extensions.Primitives;
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

            services.AddCors(options => options.AddPolicy("ESportCors", builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            }));

            services.AddControllersWithViews().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            services.AddControllers().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            services.AddAuthentication(o =>
            {
                o.DefaultAuthenticateScheme = ESportAuthSchemeConstant.ESportAuthScheme;
                o.DefaultChallengeScheme = ESportAuthSchemeConstant.ESportAuthScheme;
            })
            .AddScheme<ESportAuthenticationOptions, ESportAuthenticationHandler>("ESport", o => { });

            services.AddDbContext<IdentityDataContext>(options => options.UseSqlServer(Configuration.GetConnectionString("IdentityDb")));

            services.AddAutoMapper(typeof(Startup));

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

            app.UseCors("ESportCors");

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseRedirectMiddleware();

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
