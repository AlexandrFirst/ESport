using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserWorkflow.Application.Models.Gym
{
    public class GymTrainerInfo
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<TrainerSport> TrainerSport { get; set; }
    }

    public class TrainerSport : GymSports 
    {
        public string Level { get; set; }
    }
}
