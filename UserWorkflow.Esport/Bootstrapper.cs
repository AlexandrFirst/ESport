using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkflow.Esport
{
    public class Bootstrapper
    {
        public static void RegisterIocContainers(IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<EsportDataContext>(options => options.UseSqlServer(configuration.GetSection("ConnectionString")["EsportDb"]));
        }
    }
}
