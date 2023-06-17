using MediaClient.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediaClient.Middleware
{
    public static class MediaClientMiddlewareExtension
    {
        public static IApplicationBuilder UseGoogleServices(this IApplicationBuilder app)
        {
            var options = app.ApplicationServices.GetService<IOptions<GoogleAuthOptions>>();

            app.UseMiddleware<MediaClientMiddleware>(options);
            return app;
        }
    }
}
