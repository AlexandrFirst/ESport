using IdentityV2.Config;
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
using Microsoft.AspNetCore.Http;
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

            services.AddCors(options =>
            {
                options.AddPolicy("ESportCors", builder =>
                {
                    builder.WithOrigins("http://localhost:3000", "http://localhost:6005", "https://e-sport.cloud", "https://localhost", "https://localhost:443", "https://localhost:80", "https://localhost:3000")
                           .AllowAnyMethod()
                           .AllowAnyHeader()
                           .AllowCredentials();
                });

                options.AddPolicy("UserFlowPolicy", builder =>
                {
                    builder.WithOrigins("http://localhost:5005", "https://e-sport.cloud:5005", "https://localhost", "https://localhost:443", "https://localhost:80")
                            .AllowAnyMethod()
                            .AllowAnyHeader()
                            .AllowCredentials();
                });
            });

            services.AddControllersWithViews().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            services.AddSwaggerGen(c => c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo()
            {
                Version = "v1",
                Title = "Auth API",
                Description = "EScore Identity microservice"
            }));

            services.AddAuthentication(o =>
            {
                o.DefaultAuthenticateScheme = ESportAuthSchemeConstant.ESportAuthScheme;
                o.DefaultChallengeScheme = ESportAuthSchemeConstant.ESportAuthScheme;
            })
            .AddScheme<ESportAuthenticationOptions, ESportAuthenticationHandler>("ESport", o => { });
            services.AddHttpContextAccessor();

            services.Configure<CookiePolicyOptions>(options =>
            {
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            var connectionString = Configuration.GetConnectionString("IdentityDb");
            System.Console.WriteLine("Connection string: " + connectionString);
            services.AddDbContext<IdentityDataContext>(options => options.UseSqlServer(connectionString));


            services.AddOptions<MailOption>().Bind(Configuration.GetSection("MailOption"));

            RMQEsportClient.Bootstrapper.RegisterIocContainers(services, Configuration);


            services.AddAutoMapper(typeof(Startup));

            services.AddMemoryCache();


            services.AddScoped<IJWTManagerRepository, JWTManagerRepository>();
            services.AddScoped<IAccountService, AccountService>();

            services.AddTransient<IAuthorizationCache, AuthorizationCache>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
         

            app.UseStaticFiles();

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Auth API");
            });

            app.UseRouting();

            app.UseCors();

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
