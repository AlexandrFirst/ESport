using RMQEsportClient.QueueConfigs;

namespace RMQEsportClient
{
    public interface IMessageProducer
    {
        void SendMessage<T>(T message, QueueConfigName configName);
        void SendMessageToTopic<T>(T message, QueueConfigName configName);
    }
}
