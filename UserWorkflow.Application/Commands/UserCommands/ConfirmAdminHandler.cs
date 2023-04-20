using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Esport;
using UserWorkFlow.Infrastructure.Commands;

namespace UserWorkflow.Application.Commands.UserCommands
{
    public class ConfirmAdminHandler : ICommandHandler<ConfirmAdmin>
    {
        private readonly EsportDataContext context;

        public ConfirmAdminHandler(EsportDataContext context)
        {
            this.context = context;
        }

        public Task<CommandResult> HandleCommandAsync(ConfirmAdmin command)
        {
            throw new NotImplementedException();
        }
    }
}
