using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Base;
using UserWorkflow.Application.Requests.User;

namespace UserWorkflow.Application.Commands.UserCommands
{
    public class ConfirmAdmin: BaseCommand
    {
        public int UserId { get; set; }
        public AdminType AdminType { get; set; }
    }
}
