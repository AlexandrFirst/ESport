using ESportAuthClient.ESportAuthClient;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using StreamingService.Authentication;
using StreamingService.DL;
using StreamingService.Hubs;
using StreamingService.Models.Options;
using StreamingService.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace StreamingService
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
            services.AddAuthentication(o =>
            {
                o.DefaultAuthenticateScheme = "EStream";
                o.DefaultChallengeScheme = "EStream";
            })
            .AddScheme<EStreamAuthOptions, EStreamAuthHandler>("EStream", o => { })
            .AddScheme<ESportClientAuthenticationOptions, ESportClientAuthenticationHandler>("WS", o =>
            {
                o.Authority = Configuration.GetSection("Security")["Authority"];
            });

            services.AddControllers();
            services.AddSignalR();

            services.AddDbContext<StreamDataContext>(options =>
                options.UseSqlServer(Configuration.GetSection("ConnectionString")["StreamDb"]));

            services.AddOptions<KurrentoOptions>().Bind(Configuration.GetSection("KurentoData"));

            services.AddCors(options => options.AddPolicy("ESportCors", builder =>
            {
                builder.WithOrigins("http://localhost:4200", "http://164.92.190.247:4200", "https://e-sport.cloud:4200")
                       .AllowAnyMethod()
                       .AllowAnyHeader()
                       .AllowCredentials();
            }));

        
            services.AddTransient<StreamProvider>();
            services.AddTransient<UploadFileService>();
            services.AddSingleton<StreamRepositry>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("ESportCors");

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<KurrentoHub>("/kurrento", options =>
                {
                    options.Transports =
                       HttpTransportType.WebSockets;
                });
            });
        }
    }
}
