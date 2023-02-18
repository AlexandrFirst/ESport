using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using RabbitMQ.Client;
using RMQEsportClient.QueueConfigs;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Text;

namespace RMQEsportClient
{
    public class RabbitMQProducer : IMessageProducer
    {
        private ConnectionFactory _connectionFactory;

        private IConnection _connection;
        private Object _lock = new object();
        private Object _topicLock = new object();

        private readonly RabbitMqOptions rabbitMqOptions;
        private readonly QueueConfigFactory queueConfigFactory;

        private ConcurrentDictionary<string, IModel> queueChannels = new ConcurrentDictionary<string, IModel>();       

        public RabbitMQProducer(IOptions<RabbitMqOptions> rabbitMqOptions, IOptions<QueueConfigFactory> queueFactoryOptions)
        {
            this.rabbitMqOptions = rabbitMqOptions.Value;
            this.queueConfigFactory = queueFactoryOptions.Value;

            _connectionFactory = new ConnectionFactory
            {
                HostName = this.rabbitMqOptions.Host,
                UserName = this.rabbitMqOptions.User,
                Password = this.rabbitMqOptions.Password,
                Port = this.rabbitMqOptions.Port,
                RequestedHeartbeat = new TimeSpan(60),
                DispatchConsumersAsync = true
            };
        }

        public void SendMessage<T>(T message, QueueConfigName configName)
        {
            lock (_lock)
            {
                var channelSend = GetChannel<T>(configName, ExchangeType.Direct);
                channelSend(message);
            }
        }

        public void SendMessageToTopic<T>(T message, QueueConfigName configName) 
        {
            lock (_topicLock) 
            {
                var channelSend = GetChannel<T>(configName, ExchangeType.Topic);
                channelSend(message);
            }
        }


        private Action<T> GetChannel<T>(QueueConfigName configName, string exchangeType) 
        {
            if (_connection == null)
            {
                _connectionFactory.AutomaticRecoveryEnabled = true;
                _connectionFactory.NetworkRecoveryInterval = TimeSpan.FromSeconds(10);
                _connection = _connectionFactory.CreateConnection();
            }

            var queueOptions = queueConfigFactory.GetMessageModel(configName);

            var isChannelExists = queueChannels.TryGetValue(configName.Value, out var channel);

            if (!isChannelExists)
            {
                channel = _connection.CreateModel();

                channel.ExchangeDeclare(queueOptions.MailExchangeName, exchangeType);
                channel.QueueDeclare(queueOptions.QueueName, true, false, true);
                channel.QueueBind(queueOptions.QueueName, queueOptions.MailExchangeName, queueOptions.RoutingKey, null);


                channel.BasicQos(0, 1, false);
                queueChannels.TryAdd(configName.Value, channel);
            }

            return (T message) => 
            {
                var json = JsonConvert.SerializeObject(message);
                var body = Encoding.UTF8.GetBytes(json);
                channel.BasicPublish(exchange: queueOptions.MailExchangeName, routingKey: queueOptions.RoutingKey, body: body);
            };
        }
    }
}
