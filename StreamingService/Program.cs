using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace StreamingService
{
    public class Program
    {
        public static void Main(string[] args)
        {
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
                            if (env == "Local")
                            {
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
