using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserWorkflow.Application.Models.Exercise
{
    public enum ExerciseTutorialAction { CREATE = 1, DELETE = 2, UPDATE = 4 }

    public class ExerciseMediaModel
    {
        public IFormFile ExerciseTutorial { get; set; }
        public int ExerciseId { get; set; }
        public ExerciseTutorialAction ExerciseTutorialAction { get; set; }
        public int? TutorialId { get; set; }

    }
}
