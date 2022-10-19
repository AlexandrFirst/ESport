using MessageService.Models;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using RabbitMQ.Client.Exceptions;
using System;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace MessageService.Workers
{
    public class EmailWorker : BackgroundService
    {
        private readonly IServiceCollection serviceCollection;
        private readonly ILogger<EmailWorker> _logger;
        private readonly RabbitMqOptions rabbitMqOptions;

        private ConnectionFactory _connectionFactory;
        private IConnection _connection;
        private IModel _channel;
        private const string QueueName = "emails";

        public EmailWorker(IServiceCollection serviceCollection,
            ILogger<EmailWorker> logger,
            IOptions<RabbitMqOptions> rabbitMqOptions)
        {
            this.serviceCollection = serviceCollection;
            this._logger = logger;
            this.rabbitMqOptions = rabbitMqOptions.Value;
        }

        public override Task StartAsync(CancellationToken cancellationToken)
        {
            _connectionFactory = new ConnectionFactory
            {
                HostName = rabbitMqOptions.Host,
                UserName = rabbitMqOptions.User,
                Password = rabbitMqOptions.Password,
                Port = rabbitMqOptions.Port,
                DispatchConsumersAsync = true
            };
            _connection = _connectionFactory.CreateConnection();
            _channel = _connection.CreateModel();

            _logger.LogInformation($"Queue [{QueueName}] is waiting for messages.");

            return base.StartAsync(cancellationToken);
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            stoppingToken.ThrowIfCancellationRequested();
            var consumer = new AsyncEventingBasicConsumer(_channel);

            consumer.Received += async (bc, ea) =>
            {
                var message = Encoding.UTF8.GetString(ea.Body.ToArray());
                _logger.LogInformation($"Processing msg: '{message}'.");
                try
                {

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
                _channel.BasicConsume(queue: QueueName, autoAck: false, consumer: consumer);

                await Task.CompletedTask;

            };
        }

        public override async Task StopAsync(CancellationToken cancellationToken)
        {
            await base.StopAsync(cancellationToken);
            _connection.Close();
            _logger.LogInformation("RabbitMQ connection is closed.");
        }
    }
}
