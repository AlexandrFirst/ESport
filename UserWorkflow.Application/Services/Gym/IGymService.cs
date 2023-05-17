using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Models.Gym;

namespace UserWorkflow.Application.Services.Gym
{
    public interface IGymService
    {
        Task<GymInfoListing> GetGymInfoListing(GymFiltrattionModel gymFiltrattionModel);
    }
}
