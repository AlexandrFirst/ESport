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
            var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            Console.WriteLine("Current environment: " + env);
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
                                new[] { "main", "apiGateway", "streaming", "confirm", "admin", "trainee"}, hostingContext.HostingEnvironment)
                            .AddEnvironmentVariables();
                    })
                   .ConfigureWebHostDefaults(webBuilder =>
                   {
                       webBuilder.UseStartup<Startup>();
                       webBuilder.UseKestrel(o =>
                       {
                           o.Listen(IPAddress.Any, 443, opt => 
                           {
                               var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
                               if (env == "Local") 
                               {
                                   var isKeyFileExists = File.Exists(".cerfs/localhost.pfx");
                                   if (!isKeyFileExists) { Console.WriteLine("File doesn't exists: " + ".cerfs/localhost.pfx"); }
                                   opt.UseHttps(".cerfs/localhost.pfx", "1234");
                               }
                               else
                               {

                                   opt.UseHttps(".cerfs/key.pfx", "1234");
                               }
                           });
                           o.Listen(IPAddress.Any, 5002);
                       });
                   });

            return builder;
        }
    }
}
