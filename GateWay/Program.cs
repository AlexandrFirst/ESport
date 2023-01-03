using GateWay.Extensions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace GateWay
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args)
        {
            var builder = Host.CreateDefaultBuilder(args);

            builder.ConfigureAppConfiguration((hostingContext, config) =>
                    {
                        config
                            .SetBasePath(hostingContext.HostingEnvironment.ContentRootPath)
                            .AddJsonFile("appsettings.json", true, true)
                            .AddJsonFile($"appsettings.{hostingContext.HostingEnvironment.EnvironmentName}.json", true, true)
                            .AddOcelotconfigFiles($"./Configuration/{hostingContext.HostingEnvironment.EnvironmentName}",
                                new[] { "main", "apiGateway"}, hostingContext.HostingEnvironment)
                            .AddEnvironmentVariables();
                    })
                   .ConfigureWebHostDefaults(webBuilder =>
                   {
                       webBuilder.UseStartup<Startup>();
                   });

            return builder;
        }
    }
}
