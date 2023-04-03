using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Base;
using UserWorkflow.Application.ReadModels.User;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Application.Commands.UserCommands
{
    public class DeleteUser: BaseCommand
    {
        public UserTypeEntity DeleteUserEntities { get; set; }
    }
}
