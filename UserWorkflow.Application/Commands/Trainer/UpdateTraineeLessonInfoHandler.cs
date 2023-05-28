using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Esport;
using UserWorkFlow.Infrastructure.Commands;

namespace UserWorkflow.Application.Commands.Trainer
{
    public class UpdateTraineeLessonInfoHandler : ICommandHandler<UpdateTraineeLessonInfo>
    {
        private readonly EsportDataContext esportDataContext;

        public UpdateTraineeLessonInfoHandler(EsportDataContext esportDataContext)
        {
            this.esportDataContext = esportDataContext;
        }

        public async Task<CommandResult> HandleCommandAsync(UpdateTraineeLessonInfo command)
        {
            var lesson = await esportDataContext.Lessons.FirstOrDefaultAsync(x => x.Id == command.LessonId);
            if (lesson == null)
            {
                throw new ApplicationException("Unable to find lesson with id: " + command.LessonId);
            }

            foreach (var traineeLesson in command.TraineeLessoInfos)
            {
                var m_traineeLesson = lesson.TraineeShedules.FirstOrDefault(x => x.TraineeId == traineeLesson.TraineeId);
                if (m_traineeLesson == null) { continue; }

                var exerciseToAdd = traineeLesson.traineeExercise.Where(x => !m_traineeLesson.TraineeSheduleExercises.Any(p => p.TraineeExercise.ExerciseId == x.ExerciseId)).ToList();
                var exerciseToRemove = m_traineeLesson.TraineeSheduleExercises.Where(x => !traineeLesson.traineeExercise.Any(p => p.ExerciseId == x.TraineeExercise.ExerciseId)).ToList();
                var exerciseToUpdate = m_traineeLesson.TraineeSheduleExercises.Join(traineeLesson.traineeExercise, x => x.TraineeExercise.ExerciseId, y => y.ExerciseId, (i, o) =>
                new
                {
                    OldExercise = i,
                    NewExercise = o
                }).ToList();

                exerciseToAdd.ForEach(x =>
                {
                    m_traineeLesson.TraineeSheduleExercises.Add(new Esport.Models.TraineeSheduleTraineeExercise()
                    {
                        Notes = x.ExerciseNotes,
                        Order = x.ExerciseOrder,
                        TraineeExercise = new Esport.Models.TraineeExercise()
                        {
                            ExerciseType = Esport.Models.ExerciseType.TrainerAdded,
                            ExerciseId = x.ExerciseId,
                            DescriptionOverride = x.OverrideDescription,
                            ExerciseStatus = x.ExerciseStatus ?? Esport.Models.ExerciseStatus.Active
                        }
                    });
                });

                m_traineeLesson.TraineeSheduleExercises.RemoveAll(x => exerciseToRemove.Select(x => x.TraineeSheduleId).Any(p => p == x.TraineeSheduleId));

                exerciseToUpdate.ForEach(x =>
                {
                    x.OldExercise.Notes = x.NewExercise.ExerciseNotes;
                    x.OldExercise.Order = x.NewExercise.ExerciseOrder;

                    if (x.OldExercise.TraineeExercise != null)
                    {
                        x.OldExercise.TraineeExercise.ExerciseId = x.NewExercise.ExerciseId;
                        x.OldExercise.TraineeExercise.ExerciseType = Esport.Models.ExerciseType.TrainerAdded;
                        x.OldExercise.TraineeExercise.DescriptionOverride = x.NewExercise.OverrideDescription;
                    }
                    else
                    {
                        x.OldExercise.TraineeExercise = new Esport.Models.TraineeExercise()
                        {
                            ExerciseType = Esport.Models.ExerciseType.TrainerAdded,
                            ExerciseId = x.NewExercise.ExerciseId,
                            DescriptionOverride = x.NewExercise.OverrideDescription,
                            ExerciseStatus = x.NewExercise.ExerciseStatus ?? Esport.Models.ExerciseStatus.Active
                        };
                    }

                });
            }

            if (command.RemoveTraineeFromLesson.Any())
                lesson.TraineeShedules.RemoveAll(x => command.RemoveTraineeFromLesson.Any(p => p == x.TraineeId));

            await esportDataContext.SaveChangesAsync();
            return new CommandResult(1);
        }
    }
}
