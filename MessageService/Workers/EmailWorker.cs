using MessageService.Models;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace MessageService.Workers
{
    public class EmailWorker : BackgroundService
    {
        private readonly IServiceCollection serviceCollection;
        private readonly ILogger<EmailWorker> logger;
        private readonly RabbitMqOptions rabbitMqOptions;

        public EmailWorker(IServiceCollection serviceCollection,
            ILogger<EmailWorker> logger,
            IOptions<RabbitMqOptions> rabbitMqOptions)
        {
            this.serviceCollection = serviceCollection;
            this.logger = logger;
            this.rabbitMqOptions = rabbitMqOptions.Value;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                var factory = new ConnectionFactory
                {
                    HostName = rabbitMqOptions.Host,
                    UserName = rabbitMqOptions.User,
                    Password = rabbitMqOptions.Password,
                    Port = rabbitMqOptions.Port
                };

                var connection = factory.CreateConnection();
                using var channel = connection.CreateModel();
                channel.QueueDeclare("emails");
                var consumer = new EventingBasicConsumer(channel);

                consumer.Received += (model, eventArgs) =>
                {
                    var body = eventArgs.Body.ToArray();
                    var message = Encoding.UTF8.GetString(body);
                    logger.LogInformation("New email message");
                };

                channel.BasicConsume(queue: "orders", autoAck: true, consumer: consumer);
            }
        }
    }
}
