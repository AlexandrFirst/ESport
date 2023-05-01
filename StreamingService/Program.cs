using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Runtime.ConstrainedExecution;
using System.Threading.Tasks;

namespace StreamingService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            Console.WriteLine("Current environment: " + env);
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                    webBuilder.UseKestrel(o =>
                    {
                        o.Listen(IPAddress.Any, 5014, opt =>
                        {
                            var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
                            Console.WriteLine("Current environment: " + env);
                            if (env == "Local")
                            {
                                bool isKeyExists = File.Exists(".cerfs/localhost.pfx");
                                if (isKeyExists) { Console.WriteLine("Local key file exists: " + ".cerfs/localhost.pfx"); }
                                opt.UseHttps(".cerfs/localhost.pfx", "1234");
                            }
                            else
                            {
                                opt.UseHttps(".cerfs/key.pfx", "1234");
                            }

                        });
                        o.Listen(IPAddress.Any, 5004);
                    });
                });
    }
}
