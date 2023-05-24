using MediaClient.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Esport;
using UserWorkflow.Esport.Models;
using UserWorkFlow.Infrastructure.Commands;

namespace UserWorkflow.Application.Commands.Trainer
{
    public class ExerciseCreateHandler : ICommandHandler<ExerciseCreate>
    {
        private readonly EsportDataContext esportDataContext;
        private readonly IMediaService mediaService;

        public ExerciseCreateHandler(EsportDataContext esportDataContext,
            IMediaService mediaService)
        {
            this.esportDataContext = esportDataContext;
            this.mediaService = mediaService;
        }

        public async Task<CommandResult> HandleCommandAsync(ExerciseCreate command)
        {
            var userId = command.AuthenticatedBy.UserId;
            var trainer = await esportDataContext.Trainers.FirstOrDefaultAsync(x => x.UserId == userId);
            if (trainer == null)
            {
                throw new Exception("No trainer with user id: " + userId);
            }

            var exercise = new Exercise();
            exercise.Name = command.Name;
            exercise.Description = command.Description;
            exercise.AgeLimit = command.AgeLimit;

            exercise.IsPublic = command.IsPublic;

            command.SportIds.ForEach(sportId =>
            {
                exercise.ExerciseSports.Add(new ExerciseSport() { SportId = sportId });
            });

            command.BodyPartIds.ForEach(bodyPartId =>
            {
                exercise.BodyParts.Add(new ExerciseBodyPart() { BodyPartId = bodyPartId });
            });

            command.TraumaIds.ForEach(traumaId =>
            {
                exercise.ExerciseTraumas.Add(new ExerciseTraumas() { TraumaId = traumaId });
            });

            if (command.VideoExerciseExample != null) {

                var uploadResult = await mediaService.UploadFile("exercise_tutorials", command.VideoExerciseExample);

                var exerciseTutorial = new ExerciseTutorial()
                {
                    Link = uploadResult.FileId,
                    PublicId = uploadResult.Id,
                };

                exercise.ExerciseTutorails.Add(exerciseTutorial);
            }

            trainer.Exercise.Add(exercise);
            await esportDataContext.SaveChangesAsync();

            return new CommandResult(exercise.Id);
        }
    }
}
