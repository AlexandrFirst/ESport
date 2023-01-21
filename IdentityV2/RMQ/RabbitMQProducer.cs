using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using RabbitMQ.Client;
using System;
using System.Text;

namespace IdentityV2.RMQ
{
    public class RabbitMQProducer : IMessageProducer
    {
        private ConnectionFactory _connectionFactory;

        private IConnection _connection;

        private readonly RabbitMqOptions rabbitMqOptions;

        public IModel channel;

        private const string mailExchangename = "mail_exchange";
        private const string queueName = "emails";
        private const string routingKey = "mail";

        public RabbitMQProducer(IOptions<RabbitMqOptions> rabbitMqOptions)
        {
            this.rabbitMqOptions = rabbitMqOptions.Value;

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

        public void SendMessage<T>(T message)
        {
            if (_connection == null)
            {
                _connectionFactory.AutomaticRecoveryEnabled = true;
                _connectionFactory.NetworkRecoveryInterval = TimeSpan.FromSeconds(10);
                _connection = _connectionFactory.CreateConnection();
            }

            if (channel == null) {
                channel = _connection.CreateModel();

                channel.ExchangeDeclare(mailExchangename, ExchangeType.Direct);
                channel.QueueDeclare(queueName, true, false, true);
                channel.QueueBind(queueName, mailExchangename, routingKey, null);


                channel.BasicQos(0, 1, false);
            }
            var json = JsonConvert.SerializeObject(message);
            var body = Encoding.UTF8.GetBytes(json);
            channel.BasicPublish(exchange: mailExchangename, routingKey: routingKey, body: body);
        }
    }
}
