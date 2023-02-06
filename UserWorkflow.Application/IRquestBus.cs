using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using UserFlow.Infrastructure.Queries;

namespace UserWorkflow.Application
{
    public interface IRquestBus
    {
        Task<IRequestResult<TData>> ExecuteAsync<T, TData>(ClaimsPrincipal user, T query)
            where T : IRequest;
    }
}
