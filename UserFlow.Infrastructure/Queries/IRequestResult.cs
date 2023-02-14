using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkFlow.Infrastructure.Queries
{
    public interface IRequestResult<out TData>
    {
        TData Data { get; }
        bool Succeeded { get; }
        IEnumerable<string> Errors { get; }
        Exception ResultException { get; }
    }
}
