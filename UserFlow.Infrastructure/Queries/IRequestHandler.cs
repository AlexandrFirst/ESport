using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace UserWorkFlow.Infrastructure.Queries
{
    public interface IRequestHandler<in T, TData> where T : IRequest
    {
        Task<RequestResult<TData>> HandleQueryAsync(T request);
    }
}
