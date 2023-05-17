using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Base;
using UserWorkflow.Application.Models.Gym;

namespace UserWorkflow.Application.Requests.Gym
{
    public class GetGymListing: BaseRequest
    {
        public GymFiltrattionModel GymFiltrattionModel { get; set; }
    }

    public class GetGymListingResult 
    {
        public GymInfoListing GymInfoListing { get; set; }
    }
}
