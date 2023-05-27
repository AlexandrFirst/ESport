using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Base;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Application.Commands.UserCommands
{
    public class SetProfileAsLogin: BaseCommand
    {
        public UserTypeEntity UserTypeProfile { get; set; }
    }
}
