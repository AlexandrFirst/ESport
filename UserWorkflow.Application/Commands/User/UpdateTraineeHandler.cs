using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkFlow.Infrastructure.Commands;

namespace UserWorkflow.Application.Commands.User
{
    public class UpdateTraineeHandler : ICommandHandler<UpdateTrainee>
    {
        public Task<CommandResult> HandleCommandAsync(UpdateTrainee command)
        {
            throw new NotImplementedException();
        }
    }
}
