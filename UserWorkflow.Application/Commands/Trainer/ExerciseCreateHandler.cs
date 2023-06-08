using MediaClient.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Models.Exercise;
using UserWorkflow.Application.Services.Media;
using UserWorkflow.Esport;
using UserWorkflow.Esport.Models;
using UserWorkFlow.Infrastructure.Commands;

namespace UserWorkflow.Application.Commands.Trainer
{
    public class ExerciseCreateHandler : ICommandHandler<ExerciseCreate>
    {
        private readonly EsportDataContext esportDataContext;
        private readonly IServiceProvider serviceProvider;
        private readonly IUserMediaService userMediaService;

        public ExerciseCreateHandler(EsportDataContext esportDataContext,
           IServiceProvider serviceProvider, 
            IUserMediaService userMediaService)
        {
            this.esportDataContext = esportDataContext;
            this.serviceProvider = serviceProvider;
            this.userMediaService = userMediaService;
        }

        public async Task<CommandResult> HandleCommandAsync(ExerciseCreate command)
        {
            var userId = command.AuthenticatedBy.UserId;
            var trainer = await esportDataContext.Trainers.FirstOrDefaultAsync(x => x.UserId == userId);
            if (trainer == null)
            {
                throw new Exception("No trainer with user id: " + userId);
            }

            var exercise = trainer.Exercise.FirstOrDefault(x => x.Id == command.ExerciseId);
            if (exercise == null)
            {
                exercise = new Exercise();
            }

            exercise.Name = command.Name;       
            exercise.Description = command.Description;
            exercise.AgeLimit = command.AgeLimit;
            exercise.ExerciseOwnerId = trainer.Id;
            exercise.IsPublic = command.IsPublic;

            handleSportInfos(exercise, command.SportIds);
            handleBodyParts(exercise, command.BodyPartIds);
            handleTraumasInfo(exercise, command.TraumaIds);
            if (exercise.Id == 0) 
            {
                await esportDataContext.AddAsync(exercise);
            }

            await esportDataContext.SaveChangesAsync();

            await handleExerciseTutorials(exercise.Id, command.exerciseInfos);
                   
            return new CommandResult(exercise.Id);
        }

        private void handleSportInfos(Exercise exercise, List<int> sportIds)
        {
            sportIds ??= new List<int>();

            var sportToAdd = sportIds.Where(x => !exercise.ExerciseSports.Any(s => s.SportId == x)).ToList();
            var sportsToRemove = exercise.ExerciseSports.Where(x => sportIds.Any(p => p == x.SportId)).Select(x => x.SportId).ToList();

            sportToAdd.ForEach(sportId =>
            {
                exercise.ExerciseSports.Add(new ExerciseSport() { SportId = sportId });
            });

            exercise.ExerciseSports.RemoveAll(x => sportsToRemove.Contains(x.SportId));
        }

        private void handleBodyParts(Exercise exercise, List<int> bodyPartsIds)
        {
            bodyPartsIds ??= new List<int>();
            var bodyPartToAdd = bodyPartsIds.Where(x => !exercise.BodyParts.Any(s => s.BodyPartId == x)).ToList();
            var bodyPartToRemove = exercise.BodyParts.Where(x => bodyPartsIds.Any(p => p == x.BodyPartId)).Select(x => x.BodyPartId).ToList();

            bodyPartToAdd.ForEach(bodyPartId =>
            {
                exercise.BodyParts.Add(new ExerciseBodyPart() { BodyPartId = bodyPartId });
            });

            exercise.BodyParts.RemoveAll(x => bodyPartToRemove.Contains(x.BodyPartId));
        }

        private void handleTraumasInfo(Exercise exercise, List<int> traumaIds)
        {
            traumaIds ??= new List<int>();

            var traumasToAdd = traumaIds.Where(x => !exercise.ExerciseTraumas.Any(s => s.TraumaId == x)).ToList();
            var traumasToRemove = exercise.ExerciseTraumas.Where(x => traumaIds.Any(p => p == x.TraumaId)).Select(x => x.TraumaId).ToList();

            traumasToAdd.ForEach(traumaId =>
            {
                exercise.ExerciseTraumas.Add(new ExerciseTraumas() { TraumaId = traumaId });
            });

            exercise.ExerciseTraumas.RemoveAll(x => traumasToRemove.Contains(x.TraumaId));
        }

        private async Task handleExerciseTutorials(int exerciseId, List<ExerciseTutorialInfo> exerciseTutorialInfo)
        {

            using var scope = serviceProvider.CreateScope();

            var _context = scope.ServiceProvider.GetRequiredService<EsportDataContext>();

            exerciseTutorialInfo ??= new List<ExerciseTutorialInfo>();

            var exercise = await _context.Exercises.FirstOrDefaultAsync(x => x.Id == exerciseId);
            if (exercise == null) { throw new ApplicationException("Exercise with id: " + exerciseId + " is not found"); }

            var tutorialToAdd = exerciseTutorialInfo.Where(x => !exercise.ExerciseTutorails.Any(s => s.Link == x.ExerciseId)).ToList();
            var tutorialToRemove = exercise.ExerciseTutorails.Where(x => !exerciseTutorialInfo.Any(s => s.ExerciseId == x.Link)).ToList();

            var mediaWriter = userMediaService.GetMediaUploadChannelWriter();

            foreach (var tutorial in tutorialToAdd)
            {
                await mediaWriter.WriteAsync(new ExerciseMediaModel() 
                {
                    ExerciseId= exerciseId,
                    ExerciseTutorial = tutorial.VideoExerciseExample,
                    ExerciseTutorialAction = ExerciseTutorialAction.CREATE
                });
            }

            foreach (var tutorial in tutorialToRemove)
            {
                await mediaWriter.WriteAsync(new ExerciseMediaModel()
                {
                    ExerciseId = exerciseId,
                    ExerciseTutorialAction = ExerciseTutorialAction.DELETE,
                    TutorialId = tutorial.Id
                });
            }

            await _context.SaveChangesAsync();
        }

    }
}
