using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserWorkflow.Application.Models.User
{
    public class PendingTraineeInfo
    {
        public int UserId { get; set; }
        public int TraineeId { get; set; }
        public int LessonId { get; set; }
        public string TraineeName { get; set; }
    }
}
