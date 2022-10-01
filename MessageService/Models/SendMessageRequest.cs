using System.Collections.Generic;

namespace MessageService.Models
{
    public class SendMessageRequest
    {
        public List<string> ToMail { get; set; }
        public string Template { get; set; }
        public string Metatdata { get; set; }
    }
}
