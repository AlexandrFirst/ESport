using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserWorkflow.Application.Models.User
{
    public class ProfileConfirmationMessage
    {
        public string Token { get; set; }
        public string Email { get; set; }
    }
}
