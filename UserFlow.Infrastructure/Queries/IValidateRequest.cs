using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkFlow.Infrastructure.Queries
{
    public interface IValidateRequest
    {
        List<string> Validate(IRequest request);
    }
}
