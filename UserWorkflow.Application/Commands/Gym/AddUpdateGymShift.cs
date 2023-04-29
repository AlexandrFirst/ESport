using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Base;

namespace UserWorkflow.Application.Commands.Gym
{
    public class AddUpdateGymShift: BaseCommand
    {
        public int GymId { get; set; }
        public List<GymShiftInfo> GymShiftInfos { get; set; }
    }

    public class GymShiftInfo
    {
        public int GymShift { get; set; }
        public TimeSpan Start { get; set; }
        public TimeSpan End { get; set; }
        public int DayOfTheWeek { get; set; }
    }
}
