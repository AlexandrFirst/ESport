using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Base;

namespace UserWorkflow.Application.Commands.UserCommands
{
    public class ConfirmGymAdmin: BaseCommand
    {
        public int UserId { get; set; }
        public int GymId { get; set; }
    }
}
