using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Base;

namespace UserWorkflow.Application.Commands.Gym
{
    public class ApproveTrainerResponse: BaseCommand
    {
        public int TrainerId { get; set; }
        public int RequestId { get; set; }
    }
}
