using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Base;
using UserWorkflow.Application.Models.Base;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Application.Requests.GymAdmin
{
    public class GetGymRequests : BaseRequest
    {
        public int? GymId { get; set; }
        public int? OrganisationId { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
    }

    public class GetGymRequestsResult: BaseListing
    {
        public List<GymRequestItem> GymRequestItems { get; set; }
    }

    public class GymRequestItem
    {
        public int RequestId { get; set; }
        public int GymId { get; set; }
        public int ShiftId { get; set; }
        public string GymName { get; set; }
        public string RequestDescription { get; set; }
        public TimeSpan? From { get; set; }
        public TimeSpan? To { get; set; }
        public List<DayOfTheWeek> DayOfTheWeeks { get; set; }
        public List<TimeOverride> TimeOverrides { get; set; }
        public bool IsApplied { get; set; }
    }
}
