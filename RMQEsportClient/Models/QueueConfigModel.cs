

namespace RMQEsportClient.Models
{

    public class QueueConfigModel
    {
        public string ConfigName { get; set; }
        public string MailExchangeName { get; set; }
        public string QueueName { get; set; }
        public string RoutingKey { get; set; }
    }
}
