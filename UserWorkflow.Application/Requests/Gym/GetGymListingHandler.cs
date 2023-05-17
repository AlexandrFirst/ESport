using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Services.Gym;
using UserWorkFlow.Infrastructure.Queries;

namespace UserWorkflow.Application.Requests.Gym
{
    public class GetGymListingHandler : IRequestHandler<GetGymListing, GetGymListingResult>
    {
        private readonly IGymService gymService;

        public GetGymListingHandler(IGymService gymService)
        {
            this.gymService = gymService;
        }

        public async Task<RequestResult<GetGymListingResult>> HandleQueryAsync(GetGymListing request)
        {
            if (request.GymFiltrattionModel == null)
            {
                throw new ArgumentException("Filtration model can not be null", nameof(request.GymFiltrattionModel));
            }
            var gymListingResult = await gymService.GetGymInfoListing(request.GymFiltrattionModel);

            return new RequestResult<GetGymListingResult>(new GetGymListingResult() { GymInfoListing = gymListingResult });
        }
    }
}
