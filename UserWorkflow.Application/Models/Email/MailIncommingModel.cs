using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserWorkflow.Application.Models.Email
{
    public class MailIncommingModel
    {
        public string Token { get; set; }
        public string Mail { get; set; }
        public string Template { get; set; }
    }
}
