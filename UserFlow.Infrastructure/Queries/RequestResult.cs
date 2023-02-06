using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkFlow.Infrastructure.Queries
{
    public class RequestResult<TData> : IRequestResult<TData>
    {

        public TData Data { get; }

        public bool Succeeded { get; }

        public IEnumerable<string> Error { get; }

        public Exception ResultException { get; }

        public RequestResult(TData data)
        {
            Succeeded = true;
            Data = data;
        }

        public RequestResult(IEnumerable<string> errors, Exception resultException = null)
        {
            Succeeded = false;
            Error = errors;
            ResultException = resultException;
        }
    }
}
