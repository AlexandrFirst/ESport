using System;
using System.Collections.Generic;
using System.Text;
using UserFlow.Infrastructure.Commands;
using UserFlow.Infrastructure.Security;

namespace UserWorkflow.Application.Base
{
    public class BaseCommand: ICommand
    {
        public AuthorizedBy AuthenticatedBy { get; set; }
    }
}
