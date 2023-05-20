using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Base;

namespace UserWorkflow.Application.Commands.Trainer
{
    public class ApplyTrainerForTimeSchedule: BaseCommand
    {
        public int TrainerRequestId { get; set; }
    }
}
