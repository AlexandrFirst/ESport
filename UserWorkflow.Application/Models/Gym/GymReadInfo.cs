using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserWorkflow.Application.Models.Gym
{
    public class GymReadInfo
    {
        public TimeSpan OnenTime { get; set; }
        public TimeSpan CloseTime { get; set; }
        public int OrganisationId { get; set; }
        public int GymId { get; set; }
        public string Address { get; set; }
        public List<GymSports> GymSports { get; set; }
        public List<GymTrainerInfo> gymTrainerInfos { get; set; }
    }

    public class GymSports
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }


}
