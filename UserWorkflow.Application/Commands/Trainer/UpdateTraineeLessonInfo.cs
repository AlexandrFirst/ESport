using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Base;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Application.Commands.Trainer
{
    public class UpdateTraineeLessonInfo : BaseCommand
    {
        public int LessonId { get; set; }
        public List<TraineeLessoInfo> TraineeLessoInfos { get; set; }
        public List<int> RemoveTraineeFromLesson { get; set; }
    }

    public class TraineeLessoInfo
    {
        public int TraineeId { get; set; }
        public List<TraineeLessonExersise> traineeExercise { get; set; }
    }

    public class TraineeLessonExersise
    {
        public int ExerciseId { get; set; }
        public string ExerciseNotes { get; set; }
        public int ExerciseOrder { get; set; }
        public string OverrideDescription { get; set; }
        public ExerciseStatus? ExerciseStatus { get; set; }
    }
}

