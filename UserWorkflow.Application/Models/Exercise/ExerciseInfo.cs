using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserWorkflow.Application.Models.Exercise
{
    public class ExerciseInfo
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public List<ExerciseRelationModel> SportRelations { get; set; }
        public List<ExerciseRelationModel> TraumaRelations { get; set; }
        public List<ExerciseRelationModel> BodypartRelation { get; set; }
        public List<int> ExerciseTutorialLinks { get; set; }
    }

    public class ExerciseRelationModel 
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
