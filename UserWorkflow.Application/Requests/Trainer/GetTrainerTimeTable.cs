using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Base;
using UserWorkflow.Application.Models.Gym;

namespace UserWorkflow.Application.Requests.Trainer
{
    public class GetTrainerTimeTable: BaseRequest
    {
        [Required]
        public int TrainerId { get; set; }
        public int? GymId { get; set; }
        public int? DayOfTheWeek { get; set; }
        public DateTime? StartDateTime { get; set; }
        public int? DayRange { get; set; }
    }

    public class GetTrainerTimeTableResult 
    {
        public List<GymTimeTableByDate> GymTimeTable { get; set; }
    }
}
