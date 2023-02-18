using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using RabbitMQ.Client.Exceptions;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using UserWorkflow.Application.Configs;
using UserWorkflow.Application.Services;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Application.Workers
{
    public class QueueMessageListener : BackgroundService
    {
        private readonly IServiceProvider serviceProvider;
        private readonly ILogger<QueueMessageListener> _logger;
        private RabbitMqOptions rabbitMqOptions;

        private IUserService userService;

        private ConnectionFactory _connectionFactory;
        private IConnection _connection;
        private RabbitMQ.Client.IModel _channel;
        private const string QueueName = "useridentity";

        public QueueMessageListener(IServiceProvider serviceProvider,
            ILogger<QueueMessageListener> logger)
        {
            this.serviceProvider = serviceProvider;
            this._logger = logger;

        }

        public override Task StartAsync(CancellationToken cancellationToken)
        {
            using var scope = serviceProvider.CreateScope();

            rabbitMqOptions = scope.ServiceProvider.GetService<IOptions<RabbitMqOptions>>().Value;
            userService = scope.ServiceProvider.GetService<IUserService>();

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
                    var userInfo = JsonConvert.DeserializeObject<User>(message);
                    using var scope = serviceProvider.CreateScope();

                    var userService = scope.ServiceProvider.GetService<IUserService>();

                    await userService.CreateTrainee(userInfo);

                    _channel.BasicAck(ea.DeliveryTag, false);
                }
                catch (Newtonsoft.Json.JsonException)
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
