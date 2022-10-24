namespace MessageService.RMQModels
{
    public class MailIncommingModel
    {
        public string Token { get; set; }
        public string Mail { get; set; }
        public string Template { get; set; }
    }
}
