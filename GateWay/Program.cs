using GateWay.Extensions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
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
                                new[] { "main", "apiGateway", "streaming", "confirm", "admin"}, hostingContext.HostingEnvironment)
                            .AddEnvironmentVariables();
                    })
                   .ConfigureWebHostDefaults(webBuilder =>
                   {
                       webBuilder.UseStartup<Startup>();
                       webBuilder.UseKestrel(o =>
                       {
                           o.Listen(IPAddress.Any, 443, opt => opt.UseHttps(".cerfs/key.pfx", "1234"));
                           o.Listen(IPAddress.Any, 5002);
                       });
                   });

            return builder;
        }
    }
}
