using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Base;
using UserWorkflow.Application.Models.Base;
using UserWorkflow.Application.Models.Exercise;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Application.Requests.Trainer
{
    public class GetExerciseTrainerListing: BaseRequest
    {
        public string Name { get; set; }
        public List<int> Sports { get; set; }
        public List<int> BodyParts { get; set; }
        public bool IsMine { get; set; }

        public int Page { get; set; }
        public int PageSize { get; set; }
    }

    public class GetExerciseTrainerListingResult : BaseListing 
    {
        public List<ExerciseInfo> ExerciseInfos { get; set; }
    }
}
