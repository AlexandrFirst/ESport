using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Base;
using UserWorkflow.Application.Models.Base;
using UserWorkflow.Application.Models.User;

namespace UserWorkflow.Application.Requests.Trainer
{
    public class GetPendingTrainees : BaseRequest
    {
        public List<int> LessonIds { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
    }

    public class GetPendingTraineesResult : BaseListing
    {
        public List<PendingTraineeInfo> PendingTrainees { get; set; }
    }

}
