using Google.Apis.Auth.OAuth2;
using Google.Apis.Logging;
using Google.Cloud.Storage.V1;
using MediaClient.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediaClient.Middleware
{
    public class MediaClientMiddleware
    {
        readonly RequestDelegate _next;
        private readonly ILogger<MediaClientMiddleware> logger;
        private readonly GoogleAuthOptions googleAuthOptions;

        public MediaClientMiddleware(RequestDelegate next, 
            ILogger<MediaClientMiddleware> logger,
            IOptions<GoogleAuthOptions> googleAuthOptions)
        {
            _next = next;
            this.logger = logger;
            this.googleAuthOptions = googleAuthOptions.Value;
        }

        public async Task Invoke(HttpContext context, IHostingEnvironment hostingEnviroment)
        {
            try
            {
                if (File.Exists(googleAuthOptions.CredentialPath))
                {
                    Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", googleAuthOptions.CredentialPath);
                }
                else { throw new FileNotFoundException($"Unable to find file with path: {googleAuthOptions.CredentialPath}"); }
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message + " | " + ex.InnerException.Message);
            }

            await _next.Invoke(context);
        }
    }
}
