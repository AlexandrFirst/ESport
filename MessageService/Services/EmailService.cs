using Email.Net;
using Email.Net.EDP;
using Email.Net.EDP.SendGrid;
using Email.Net.EDP.Smtp;
using MessageService.Models;
using Microsoft.AspNetCore.Hosting;
using System.Threading.Tasks;

namespace MessageService.Services
{
    public class EmailSenderService : IEmailSenderService
    {
        private readonly IEmailService emailService;
        private readonly IWebHostEnvironment env;

        public EmailSenderService(IEmailService emailService, IWebHostEnvironment env)
        {
            this.emailService = emailService;
            this.env = env;
        }

        public async Task<int> SendMessages(SendMessageRequest sendMessageRequest)
        {
            var message = EmailMessage.Compose()
             .To("to@email.net")
             .WithPlainTextContent("this is a test email")
             .WithHtmlContent("<p>this is a test email</p>")
             .WithHighPriority()
             .Build();

            var emailprovide = SmtpEmailDeliveryProvider.Name;

            if (env.EnvironmentName == "Production")
            {
                emailprovide = SendgridEmailDeliveryProvider.Name;
            }

            var result = await emailService.SendAsync(message,emailprovide);
            return 1;
        }
    }
}
