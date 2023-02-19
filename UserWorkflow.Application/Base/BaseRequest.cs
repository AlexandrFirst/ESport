using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using UserWorkFlow.Infrastructure.Queries;
using UserWorkFlow.Infrastructure.Security;

namespace UserWorkflow.Application.Base
{
    public class BaseRequest: IRequest
    {
        public AuthorizedBy AuthenticatedBy { get; set; }
        public CancellationToken CancellationToken { get; set; }
    }
}
