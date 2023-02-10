using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkflow.Application.Configs
{
    public class RabbitMqOptions
    {
        public string Host { get; set; }
        public int Port { get; set; }
        public string User { get; set; }
        public string Password { get; set; }
    }
}
