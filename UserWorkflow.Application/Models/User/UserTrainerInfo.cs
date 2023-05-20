using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserWorkflow.Application.Models.User
{
    public class UserTrainerInfo: UserIdentityInfo
    {
        public int Id { get; set; }
        public string Info { get; set; }

        public List<TrainerSportInfo> TrainerSportInfos { get; set; }
        public List<GymInfo> TrainerGymInfo { get; set; }

        public UserTrainerInfo(UserIdentityInfo userIdentityInfo): base(userIdentityInfo)
        {

        }
        public UserTrainerInfo()
        {

        }
    }
}
