using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Models.Base;

namespace UserWorkflow.Application.Models.Gym
{
    public class GymInfoListing: BaseListing
    {
        public List<GymReadInfo> GymReadInfos { get; set; }
    }
}
