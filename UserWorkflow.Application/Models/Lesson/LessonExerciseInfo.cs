using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserWorkflow.Application.Models.Lesson
{
    public class LessonExerciseInfo
    {
        public int TraineeId { get; set; }
        public string TraineeName { get; set; }
        public List<TraineeExercise> TraineeExercises { get; set; }
    }

    public class TraineeExercise 
    {
        public int ExerciseId { get; set; }
        public List<string> TutorialLink { get; set; }
        public string Description { get; set; }
        public string ExerciseNotes { get; set; }
        public int ExerciseOrder { get; set; }
    }
}

