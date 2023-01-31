using Email.Net;
using Email.Net.EDP;
using Email.Net.EDP.SendGrid;
using Email.Net.EDP.Smtp;
using MessageService.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using System.Linq;
using System.Threading.Tasks;

namespace MessageService.Services
{
    public class EmailSenderService : IEmailSenderService
    {
        private readonly IEmailService emailService;
        private readonly IWebHostEnvironment env;
        private readonly ILogger<EmailSenderService> logger;

        public EmailSenderService(IEmailService emailService, 
            IWebHostEnvironment env, ILogger<EmailSenderService> logger)
        {
            this.emailService = emailService;
            this.env = env;
            this.logger = logger;
        }

        public async Task<int> SendMessagesAsync(SendMessageRequest sendMessageRequest)
        {
            var emailprovide = SmtpEmailDeliveryProvider.Name;

            if (env.EnvironmentName == "Production")
            {
               emailprovide = SendgridEmailDeliveryProvider.Name;
            }

            foreach (var mail in sendMessageRequest.ToMail)
            {
                var message = EmailMessage.Compose()
                 .To(mail)
                 .WithHtmlContent(sendMessageRequest.Template)
                 .WithSubject("Registration confirmation")
                 .WithHighPriority()
                 .Build();

                var result = await emailService.SendAsync(message, emailprovide);
                if (result.IsSuccess)
                {
                    logger.LogInformation("Confirmation message send to: " + mail);
                }
                else 
                {
                    logger.LogError("Error while sending confirmation message to: " + mail + "; ");
                    result.Errors.ToList().ForEach(x => {
                        logger.LogError($"{x.Message};{x.Code};{x.Exception} ");
                    });
                    return 0;
                }
            }

            return 1;
        }
    }
}
