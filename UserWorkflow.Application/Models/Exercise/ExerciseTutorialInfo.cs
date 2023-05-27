using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserWorkflow.Application.Models.Exercise
{
    public class ExerciseTutorialInfo
    {
        public IFormFile VideoExerciseExample { get; set; }
        public string ExerciseId { get; set; }
    }
}
