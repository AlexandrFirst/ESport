using ESportAuthClient.ESportAuthClient;
using MediaClient.Middleware;
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
using System.IO;
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

            services.AddControllers().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
            services.AddSignalR();

            services.AddDbContext<StreamDataContext>(options =>
                options.UseSqlServer(Configuration.GetSection("ConnectionString")["StreamDb"]));

            services.AddOptions<KurrentoOptions>().Bind(Configuration.GetSection("KurentoData"));
            services.AddOptions<RecordedFileOptions>().Bind(Configuration.GetSection("RecordedFileOptions"));

            services.AddCors(options => options.AddPolicy("ESportCors", builder =>
            {
                builder.WithOrigins("http://localhost:4200", "http://164.92.190.247:4200", "https://e-sport.cloud:4201", 
                    "https://localhost", "https://localhost:443", "https://localhost:80", "https://localhost:4201")
                       .AllowAnyMethod()
                       .AllowAnyHeader()
                       .AllowCredentials();
            }));

        
            services.AddTransient<StreamProvider>();
            services.AddTransient<UploadFileService>();
            
            services.AddSingleton<StreamRepositry>();
            services.AddSingleton<IRecordService, RecordService>();

            MediaClient.Bootstrapper.RegisterIocContainers(services, Configuration);


            Console.WriteLine("Test file check");
            var filename1 = "/tmp/35c08d1c-88cd-42e3-a246-024a4651005a.WEBM";
            Console.WriteLine("Filename: " + filename1 + " exists: " + File.Exists(filename1));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCustomMediaClient();

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
