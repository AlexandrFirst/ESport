using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using UserWorkFlow.Infrastructure.Commands;

namespace UserWorkflow.Application
{
    public interface ICommandBus
    {
        Task<ICommandResult> ExecuteAsync<T>(ClaimsPrincipal user, T Command)
            where T : ICommand;
    }
}
