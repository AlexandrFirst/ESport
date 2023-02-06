using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;
using UserWorkflow.Application.Requests;
using UserWorkFlow.Infrastructure.Queries;

namespace UserWorkflow.Application
{
    public class Bootstrapper
    {
        public static void RegisterIocContainers(IServiceCollection services, IConfiguration configuration)
        {

            services.AddTransient<IRequestHandler<GetUser, GetUserResult>, GetUserHandler>();


            UserWorkflow.Esport.Bootstrapper.RegisterIocContainers(services, configuration);
            UserWorkflow.Images.Bootstrapper.RegisterIocContainers(services, configuration);
        }
    }
}
