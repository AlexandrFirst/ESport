using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using UserFlow.Infrastructure.Security;

namespace UserWorkflow.Application.Base
{
    public class BaseRequest
    {
        public AuthorizedBy AuthenticatedBy { get; set; }
        public CancellationToken CancellationToken { get; set; }
    }
}
