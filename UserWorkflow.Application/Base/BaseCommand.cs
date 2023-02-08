using System;
using System.Collections.Generic;
using System.Text;
using UserWorkFlow.Infrastructure.Commands;
using UserWorkFlow.Infrastructure.Security;

namespace UserWorkflow.Application.Base
{
    public class BaseCommand: ICommand
    {
        public AuthorizedBy AuthenticatedBy { get; set; }
    }
}
