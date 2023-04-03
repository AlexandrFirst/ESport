using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkflow.Images
{
    public class Bootstrapper
    {
        public static void RegisterIocContainers(IServiceCollection services, IConfiguration configuration) 
        {
            services.AddDbContext<ImagesDataContext>(options => 
                options.UseSqlServer(configuration.GetSection("ConnectionString")["EsportImagesDb"]),
                ServiceLifetime.Transient);
        }
    }
}
