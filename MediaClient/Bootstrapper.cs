using MediaClient.Models;
using MediaClient.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediaClient
{
    public class Bootstrapper
    {
        public static void RegisterIocContainers(IServiceCollection services, IConfiguration configuration)
        {
            services.AddTransient<IMediaService, MediaService>();
            services.AddOptions<GoogleAuthOptions>().Bind(configuration.GetSection("GoogleCloudOptions"));
        }
    }
}
