using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Esport;
using UserWorkFlow.Infrastructure.Queries;

namespace UserWorkflow.Application.Requests
{
    public class GetUserHandler : IRequestHandler<GetUser, GetUserResult>
    {
        private readonly EsportDataContext context;

        public GetUserHandler(EsportDataContext context)
        {
            this.context = context;
        }

        public async Task<RequestResult<GetUserResult>> HandlerQueryAsync(GetUser request)
        {
            var result = new GetUserResult() { Id = 2, Name = "Alex" };
            return new RequestResult<GetUserResult>(result);
        }
    }
}
