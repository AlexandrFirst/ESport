using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Base;

namespace UserWorkflow.Application.Commands.UserCommands
{
    public class ConfirmProfileEmail: BaseCommand
    {
        public string Token { get; set; }
    }
}
