
using MessageService.Models;
using MessageService.RMQModels;
using MessageService.Services;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using RabbitMQ.Client.Exceptions;
using System;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Channels;
using System.Threading.Tasks;
using JsonException = Newtonsoft.Json.JsonException;

namespace MessageService.Workers
{
    public class EmailWorker : BackgroundService
    {
        private readonly IServiceProvider serviceProvider;
        private readonly ILogger<EmailWorker> _logger;
        private RabbitMqOptions rabbitMqOptions;

        private IEmailSenderService emailService;

        private ConnectionFactory _connectionFactory;
        private IConnection _connection;
        private IModel _channel;
        private const string QueueName = "emails";

        public EmailWorker(IServiceProvider serviceProvider,
            ILogger<EmailWorker> logger)
        {
            this.serviceProvider = serviceProvider;
            this._logger = logger;

        }

        public override Task StartAsync(CancellationToken cancellationToken)
        {
            using var scope = serviceProvider.CreateScope();

            rabbitMqOptions = scope.ServiceProvider.GetService<IOptions<RabbitMqOptions>>().Value;
            emailService = scope.ServiceProvider.GetService<IEmailSenderService>();

            _connectionFactory = new ConnectionFactory
            {
                HostName = this.rabbitMqOptions.Host,
                UserName = this.rabbitMqOptions.User,
                Password = this.rabbitMqOptions.Password,
                Port = this.rabbitMqOptions.Port,
                RequestedHeartbeat = new TimeSpan(60),
                DispatchConsumersAsync = true
            };
            _connection = _connectionFactory.CreateConnection();
            _channel = _connection.CreateModel();
            _channel.BasicQos(0, 1, false);

            _logger.LogInformation($"Queue [{QueueName}] is waiting for messages.");

            return base.StartAsync(cancellationToken);
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            stoppingToken.ThrowIfCancellationRequested();


            _channel.QueueDeclare(QueueName, true, false, true);
            var consumer = new AsyncEventingBasicConsumer(_channel);

            consumer.Received += async (bc, ea) =>
            {
                var message = Encoding.UTF8.GetString(ea.Body.ToArray());


                Console.WriteLine(message);
                _logger.LogInformation($"Processing msg: '{message}'.");
                try
                {
                    var deserializedMessage = JsonConvert.DeserializeObject<MailIncommingModel>(message);

                    var result = await emailService.SendMessagesAsync(new SendMessageRequest()
                    {
                        Template = String.Format(deserializedMessage.Template, deserializedMessage.Token),
                        ToMail = new System.Collections.Generic.List<string>() { deserializedMessage.Mail}
                    });
                    if(result == 1)
                        _channel.BasicAck(ea.DeliveryTag, false);
                }
                catch (JsonException)
                {
                    _logger.LogError($"JSON Parse Error: '{message}'.");
                    _channel.BasicNack(ea.DeliveryTag, false, false);
                }
                catch (AlreadyClosedException)
                {
                    _logger.LogInformation("RabbitMQ is closed!");
                }
                catch (Exception e)
                {
                    _logger.LogError(default, e, e.Message);
                }


            };

            _channel.BasicConsume(queue: QueueName, autoAck: false, consumer: consumer);

            await Task.CompletedTask;
        }

        public override async Task StopAsync(CancellationToken cancellationToken)
        {
            await base.StopAsync(cancellationToken);
            _connection.Close();
            _logger.LogInformation("RabbitMQ connection is closed.");
        }
    }
}
