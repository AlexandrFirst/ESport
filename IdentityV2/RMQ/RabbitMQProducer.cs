using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using RabbitMQ.Client;
using System.Text;

namespace IdentityV2.RMQ
{
    public class RabbitMQProducer : IMessageProducer
    {
        private ConnectionFactory _connectionFactory;
        private IConnection _connection;
        private const string QueueName = "emails";

        private readonly RabbitMqOptions rabbitMqOptions;
        private readonly Logger<RabbitMQProducer> _logger;

        public RabbitMQProducer(IOptions<RabbitMqOptions> rabbitMqOptions, Logger<RabbitMQProducer> _logger)
        {
            this.rabbitMqOptions = rabbitMqOptions.Value;

            _connectionFactory = new ConnectionFactory
            {
                HostName = this.rabbitMqOptions.Host,
                UserName = this.rabbitMqOptions.User,
                Password = this.rabbitMqOptions.Password,
                Port = this.rabbitMqOptions.Port,
                DispatchConsumersAsync = true
            };
         
            this._logger = _logger;            
        }

        public void SendMessage<T>(T message)
        {
            _logger.LogInformation("Queue is sending message");

            _connection = _connectionFactory.CreateConnection();
            using var channel = _connection.CreateModel();
            channel.QueueDeclarePassive(QueueName);
            channel.BasicQos(0, 1, false);

            channel.QueueDeclare("emails");

            var json = JsonConvert.SerializeObject(message);
            var body = Encoding.UTF8.GetBytes(json);
            channel.BasicPublish(exchange: "", routingKey: "emails", body: body);
        }
    }
}
