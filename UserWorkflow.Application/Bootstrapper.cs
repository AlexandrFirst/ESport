using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkflow.Application
{
    public class Bootstrapper
    {
        public static void RegisterIocContainers(IServiceCollection services, IConfiguration configuration)
        {


            UserWorkflow.Esport.Bootstrapper.RegisterIocContainers(services, configuration);
            UserWorkflow.Images.Bootstrapper.RegisterIocContainers(services, configuration);
        }
    }
}
