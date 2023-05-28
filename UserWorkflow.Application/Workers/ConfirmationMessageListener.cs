using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using RMQEsportClient;
using RMQEsportClient.QueueConfigs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using UserWorkflow.Application.Configs;
using UserWorkflow.Application.Models.Email;
using UserWorkflow.Application.Services.Confirmation;

namespace UserWorkflow.Application.Workers
{
    public class ConfirmationMessageListener : BackgroundService
    {
        private readonly IServiceProvider serviceProvider;
        private readonly ILogger<ConfirmationMessageListener> logger;
        private readonly IConfirmationService confirmationService;
        private readonly ConfirmationOption confirmationOptions;
        private List<Task> listenerList = new List<Task>();
        private int listenerCount = 4;

        public ConfirmationMessageListener(IServiceProvider serviceProvider,
            ILogger<ConfirmationMessageListener> logger,
            IConfirmationService confirmationService,
            IOptions<ConfirmationOption> confirmationOptions)
        {
            this.serviceProvider = serviceProvider;
            this.logger = logger;
            this.confirmationService = confirmationService;
            this.confirmationOptions = confirmationOptions.Value;
        }


        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            var channelReader = confirmationService.GetChannelReader();
            for (int i = 0; i < listenerCount; i++)
            {
                listenerList.Add(Task.Factory.StartNew(async () =>
                {
                    await using var scope = serviceProvider.CreateAsyncScope();
                    var senderService = scope.ServiceProvider.GetRequiredService<IMessageProducer>();

                    while (!stoppingToken.IsCancellationRequested)
                    {
                        var message = await channelReader.ReadAsync(stoppingToken);
                        senderService.SendMessage<MailIncommingModel>(new MailIncommingModel()
                        {
                            Mail = message.Email,
                            Template = $"<p>To confirm profile creation follow the link <a href='{confirmationOptions.BaseUrl}/confirm/profile?token={message.Token}'>Confirm</a></p>"
                        }, QueueConfigName.MessageConfig);
                    }
                }, stoppingToken));
            }

            await Task.CompletedTask;
        }
    }
}
