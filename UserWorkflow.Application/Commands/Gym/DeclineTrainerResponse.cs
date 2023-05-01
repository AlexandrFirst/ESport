using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Base;

namespace UserWorkflow.Application.Commands.Gym
{
    public class DeclineTrainerResponse: BaseCommand
    {
        public int ResponseId { get; set; }
    }
}
