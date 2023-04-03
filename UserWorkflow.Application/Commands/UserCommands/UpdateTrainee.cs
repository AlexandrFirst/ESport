using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Base;
using UserWorkflow.Application.ReadModels.User;

namespace UserWorkflow.Application.Commands.User
{
    public class UpdateTrainee : BaseCommand
    {
        public UpdateUserInfo UpdateUserInfo { get; set; }
    }
}
