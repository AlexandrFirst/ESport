using Email.Net;
using Email.Net.EDP.SendGrid;
using Email.Net.EDP.Smtp;
using MessageService.Models;
using MessageService.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MessageService
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
            services.AddControllers();

            services.AddOptions<RabbitMqOptions>().Bind(Configuration.GetSection("RabbitMq"));

            services.AddScoped<IEmailSenderService, EmailSenderService>();

            services.AddEmailNet(options =>
            {
                options.DefaultFrom = new System.Net.Mail.MailAddress("ato31ato@gmail.com");
                options.DefaultEmailDeliveryProvider = SmtpEmailDeliveryProvider.Name;
            }).UseSmtp(config =>
            {
                config.SmtpOptions = new SmtpOptions()
                {
                    Host = Configuration.GetSection("SMTPOptions")["Host"],
                    EnableSsl = false,
                    DeliveryMethod = System.Net.Mail.SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = true
                };
            }).UseSendGrid(config =>
            {
                config.ApiKey = Configuration.GetSection("SendGrid")["Key"];
            }); ;
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
