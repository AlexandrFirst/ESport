using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Base;

namespace UserWorkflow.Application.Commands.Trainer
{
    public class ApprovePendingTrainees: BaseCommand
    {
        public List<TraineeApprovalModel> TraineeApprovalModels { get; set; }
    }

    public class TraineeApprovalModel 
    {
        public int LessonId { get; set; }
        public int TraineeId { get; set;}
    }
}
