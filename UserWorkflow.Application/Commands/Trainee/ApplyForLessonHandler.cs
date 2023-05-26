using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Esport;
using UserWorkflow.Esport.Models;
using UserWorkFlow.Infrastructure.Commands;

namespace UserWorkflow.Application.Commands.Trainee
{
    public class ApplyForLessonHandler : ICommandHandler<ApplyForLesson>
    {
        private readonly EsportDataContext esportDataContext;

        public ApplyForLessonHandler(EsportDataContext esportDataContext)
        {
            this.esportDataContext = esportDataContext;
        }

        public async Task<CommandResult> HandleCommandAsync(ApplyForLesson command)
        {
            var lesson = await esportDataContext.Lessons.FirstOrDefaultAsync(x => x.Id == command.LessonId);
            
            var userId = command.AuthenticatedBy.UserId;
            var trainee = await esportDataContext.Trainees.FirstOrDefaultAsync(x => x.UserId == userId);
            if (trainee == null) { throw new ApplicationException("No tyrainee with user id: " + userId + " is found"); }

            if (lesson.TraineeShedules.Any(p => p.TraineeId == trainee.Id)) {
                throw new ApplicationException("Trainee with id: " + trainee.Id + " is already assigned to lesson");
            }

            var traineeShedule = new TraineeShedule()
            {
                LessonId = command.LessonId,
                IsPending = true
            };

            trainee.TraineeShedules.Add(traineeShedule);
            await esportDataContext.SaveChangesAsync();

            return new CommandResult(traineeShedule.Id);
        }
    }
}
