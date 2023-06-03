using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Base;
using UserWorkflow.Application.Models.Gym;

namespace UserWorkflow.Application.Requests.GymAdmin
{
    public class GetGymTimeTable: BaseRequest
    {
        public int? DayOfTheWeek { get; set; }
        public int? TrainerId { get; set; }
        public List<int> GymId { get; set; }
    }

    public class GymWorkingHours 
    {
        public int GymId { get; set; }
        public TimeSpan From { get; set; }
        public TimeSpan To { get; set; }
    }

    public class GetGymTimeTableResponse 
    {
        public List<GymWorkingHours> GymWorkingHours { get; set; }
        public List<GymTimeTable> GymTimeTable { get; set; }
    }
}
