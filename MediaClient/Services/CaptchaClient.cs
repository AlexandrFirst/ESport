using Google.Api.Gax.ResourceNames;
using Google.Apis.Logging;
using Google.Cloud.RecaptchaEnterprise.V1;
using MediaClient.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediaClient.Services
{
    public class CaptchaClient : ICaptchaClient
    {
        private readonly GoogleAuthOptions googleAuthOptions;
        private readonly ILogger<CaptchaClient> logger;

        public CaptchaClient(IOptions<GoogleAuthOptions> googleAuthOptions, ILogger<CaptchaClient> logger)
        {
            this.googleAuthOptions = googleAuthOptions.Value;
            this.logger = logger;
        }

        public async Task<bool> ValidateHttpContext(HttpContext httpContext)
        {
            var captchaValueExists = httpContext.Request.Headers.TryGetValue("CaptchaToken", out var responseToken);

            if (!captchaValueExists) { return false; }

            RecaptchaEnterpriseServiceClient client = await RecaptchaEnterpriseServiceClient.CreateAsync();
            ProjectName projectName = new ProjectName(googleAuthOptions.GoogleId);

            var userIpAdress = httpContext.Connection.RemoteIpAddress?.ToString();
            logger.LogInformation("User ip adress: " + userIpAdress);

            CreateAssessmentRequest createAssessmentRequest = new CreateAssessmentRequest()
            {
                Assessment = new Assessment()
                {
                    Event = new Event()
                    {
                        SiteKey = googleAuthOptions.GoogleCaptchaSecret,
                        Token = responseToken,
                        UserIpAddress = userIpAdress
                    }
                },
                ParentAsProjectName = projectName,
            };

            Assessment response = await client.CreateAssessmentAsync(createAssessmentRequest);

            if (response.TokenProperties.Valid == false) 
            {
                return false;
            }

            var score = (decimal)response.RiskAnalysis.Score;
            logger.LogInformation("User score: " + score);

            if (score > 0.5m)
            {
                return true;
            }
            else 
            {
                return false;
            }
        }
    }
}
