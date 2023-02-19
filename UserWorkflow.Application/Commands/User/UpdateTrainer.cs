using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Base;
using UserWorkflow.Application.ReadModels;

namespace UserWorkflow.Application.Commands.User
{
    public class CreateUser : BaseCommand
    {
        public CreateUserInfo CreateUserInfo { get; set; }
    }
}
