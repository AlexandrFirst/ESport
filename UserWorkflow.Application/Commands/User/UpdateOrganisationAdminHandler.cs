using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkFlow.Infrastructure.Commands;

namespace UserWorkflow.Application.Commands.User
{
    public class UpdateOrganisationAdminHandler : ICommandHandler<UpdateOrganisationAdmin>
    {
        public Task<CommandResult> HandleCommandAsync(UpdateOrganisationAdmin command)
        {
            throw new NotImplementedException();
        }
    }
}
