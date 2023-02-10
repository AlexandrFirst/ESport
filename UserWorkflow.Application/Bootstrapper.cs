using Castle.Core.Configuration;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;
using UserWorkflow.Application.Configs;
using UserWorkflow.Application.Services;
using UserWorkFlow.Infrastructure.Commands;
using UserWorkFlow.Infrastructure.Queries;

namespace UserWorkflow.Application
{
    public class Bootstrapper
    {
        public static void RegisterIocContainers(IServiceCollection services, Microsoft.Extensions.Configuration.IConfiguration configuration)
        {

            services.AddOptions<RabbitMqOptions>().Bind(configuration.GetSection("RabbitMq"));

            services.AddTransient<ICommandBus, CommandBus>();
            services.AddTransient<IRequestBus, RequestBus>();
            services.AddTransient<IValidateCommand, ValidateCommand>();
            services.AddTransient<IValidateRequest, ValidateRequest>();

            services.AddTransient<IUserService, UserService>();

            services.AddAutoMapper(Assembly.GetExecutingAssembly());

            Esport.Bootstrapper.RegisterIocContainers(services, configuration);
            Images.Bootstrapper.RegisterIocContainers(services, configuration);

            RMQEsportClient.Bootstrapper.RegisterIocContainers(services, configuration);
        }
    }
}
