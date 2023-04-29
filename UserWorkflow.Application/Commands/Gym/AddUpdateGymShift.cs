using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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

        public bool IsTimeShiftsAreValid() 
        {
            return GymShiftInfos.Any(x => !x.IsValidTime());
        }
    }

    public class GymShiftInfo
    {
        public int GymShiftId { get; set; }

        [Required]
        public TimeSpan Start { get; set; }
        [Required]
        public TimeSpan End { get; set; }
        public int DayOfTheWeek { get; set; }

        public bool NotifyOnUpdate { get; set; }
        public bool ForceUpdateOverridenTimes { get; set; }

        public bool IsValidTime() 
        {
            return Start < End;
        }
    }
}
