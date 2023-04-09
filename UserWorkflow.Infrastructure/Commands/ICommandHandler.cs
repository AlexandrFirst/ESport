using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace UserWorkFlow.Infrastructure.Commands
{
    public interface ICommandHandler<in T> where T: ICommand
    {
        Task<CommandResult> HandleCommandAsync(T command);
    }
}
