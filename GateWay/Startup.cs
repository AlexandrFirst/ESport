using ESportAuthClient.ESportAuthClient;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using System;
using System.Collections.Generic;
using System.Linq;
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
                o.DefaultAuthenticateScheme = "ESport";
                o.DefaultChallengeScheme = "ESport";
            })
            .AddScheme<ESportClientAuthenticationOptions, ESportClientAuthenticationHandler>("ESport", o => { o.Authority = "http://localhost:5000"; });

            services.AddOcelot();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            var configuration = new OcelotPipelineConfiguration
            {
                AuthorisationMiddleware = async (context, next) =>
                {

                    //context.Items
                    // Logic goes here
                    await next.Invoke();
                }
            };

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseOcelot(configuration).Wait();
        }
    }
}
