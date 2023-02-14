using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Base;
using UserWorkflow.Application.Extensions;
using UserWorkFlow.Infrastructure.Queries;

namespace UserWorkflow.Application
{
    public class RequestBus : IRequestBus
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly IValidateRequest _validateRequest;

        public RequestBus(IServiceProvider serviceProvider, IValidateRequest validateRequest)
        {
            this._serviceProvider = serviceProvider;
            this._validateRequest = validateRequest;
        }


        public async Task<IRequestResult<TData>> ExecuteAsync<T, TData>(ClaimsPrincipal user, T query) where T : IRequest
        {
            var validationResult = _validateRequest.Validate(query);
            if (validationResult.Any())
            {
                return new RequestResult<TData>(validationResult);
            }

            var handler = (IRequestHandler<T, TData>)_serviceProvider.GetService(typeof(IRequestHandler<T, TData>));

            if (handler != null)
            {
                var baseRequest = query as BaseRequest;

                if (baseRequest.CancellationToken.IsCancellationRequested) 
                {
                    return new RequestResult<TData>(new List<string>() { $"The request was cancelled" });
                }

                var isAuthorized = user.TryValidateUserClaims(out var authorizedBy);
                if (isAuthorized)
                {
                    baseRequest.AuthenticatedBy = authorizedBy;
                }

                return await handler.HandleQueryAsync(query);
            }

            return new RequestResult<TData>(new List<string>() { $"Unable to find request handler for {typeof(T).FullName}" });
        }
    }
}
