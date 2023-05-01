using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Base;
using UserWorkflow.Application.Models.User;

namespace UserWorkflow.Application.Requests.GymAdmin
{
    public class GetPendingTrainers: BaseRequest
    {
        public int CurrentPage { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public int? ShiftId { get; set; }
        public int? GymId { get; set; }
    }

    public class GetPendingTrainersResult 
    {
        public List<PendingTrainerModel> PendingTrainerModels { get; set; }
        public int CurrentPage { get; set; }
        public int TotalItems { get; set; }
        public int PageSize { get; set; }
    }
}
