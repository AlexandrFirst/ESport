using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Base;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Application.Commands.Gym
{
    public class OpenTrainerRequest: BaseCommand
    {
        public int ShiftId { get; set; }
        public int? TrainerSheduleId { get; set; }
        public TimeOverride TimeOverride { get; set; }
        public string Description { get; set; }
    }
}
