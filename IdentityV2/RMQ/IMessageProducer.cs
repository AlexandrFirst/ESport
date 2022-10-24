namespace IdentityV2.RMQ
{
    public interface IMessageProducer
    {
        void SendMessage<T>(T message);
    }
}
