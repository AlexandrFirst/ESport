using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkFlow.Infrastructure.Commands
{
    public interface IValidateCommand
    {
        List<string> Validate(ICommand command);
    }
}
