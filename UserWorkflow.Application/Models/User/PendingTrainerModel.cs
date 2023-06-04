using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserWorkflow.Application.Models.User
{
    public class PendingTrainerModel
    {
        public int RequestId { get; set; }
        public TrainerInfo TrainerInfo { get; set; }
        public ScheduleInfo ScheduleInfo { get; set; }
    }

    public class ScheduleInfo 
    {
        public int GymId { get; set; }
        public int ShiftId { get; set; }
        public TimeSpan From { get; set; }
        public TimeSpan To { get; set; }
        public string DayOfTheWeek { get; set; }
    }

    public class TrainerInfo 
    {
        public string Name { get; set; }
        public int Id { get; set; }
        public string Email { get; set; }
        public List<TrainerSportInfo> TrainerSportInfos { get; set; }
    }

    public class TrainerSportInfo 
    {
        public int SportId { get; set; }
        public string Name { get; set; }
        public string Level { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
    }
}
