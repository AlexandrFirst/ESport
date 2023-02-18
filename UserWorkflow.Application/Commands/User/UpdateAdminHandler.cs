using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Esport;
using UserWorkFlow.Infrastructure.Commands;

namespace UserWorkflow.Application.Commands.User
{
    public class UpdateAdminHandler : ICommandHandler<UpdateAdmin>
    {
        private readonly EsportDataContext context;

        public UpdateAdminHandler(EsportDataContext context)
        {
            this.context = context;
        }

        public async Task<CommandResult> HandleCommandAsync(UpdateAdmin command)
        {
            if (command.CreateUserInfo.UserId < 0) 
            {
                throw new ApplicationException($"User id: {command.CreateUserInfo.UserId} must be greater than -1");
            }


        }
    }
}
