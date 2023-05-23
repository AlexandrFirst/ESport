using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Base;
using UserWorkflow.Application.Models.Base;
using UserWorkflow.Application.Models.Lesson;
using UserWorkflow.Application.Models.Trauma;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Application.Requests.Trainee
{
    public class GetTraineeRecommedation: BaseRequest
    {
        public List<TraumaHistoryRecord> TraumaHistoryRecords { get; set; }
        public LessonTimeTableFilter LessonTimeTableFilter { get; set; }
        public LessonSportFilter LessonSportFilter { get; set; }
        public List<int> TrainerIds { get; set; }
        public LessonType LessonType { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
    }

    public class GetTraineeRecommedationResult : BaseListing 
    {
        public List<LessonRecomendation> LessonRecomendations { get; set; }
    }
}
