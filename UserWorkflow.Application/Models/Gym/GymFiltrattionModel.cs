using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserWorkflow.Application.Models.Gym
{
    public class GymFiltrattionModel
    {
        public List<int> GymIds { get; set; }
        public List<int> OrganisationIds { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public TimeSpan? OpenHour { get; set; }
        public TimeSpan? CloseHour { get; set;}
        public int Page { get; set; }
        public int PageSize { get; set; }
    }
}
