using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RMQEsportClient.QueueConfigs;
using System;
using System.Collections.Generic;
using System.Text;

namespace RMQEsportClient
{
    public class Bootstrapper
    {
        public static void RegisterIocContainers(IServiceCollection services, IConfiguration configuration)
        {
            services.AddOptions<QueueConfigFactory>().Bind(configuration.GetSection("QueueConfigs"));
            services.AddSingleton<IMessageProducer, RabbitMQProducer>();
        }
    }
}
