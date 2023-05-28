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
    public class ApprovePendingTraineesHandler : ICommandHandler<ApprovePendingTrainees>
    {
        private readonly EsportDataContext esportDataContext;

        public ApprovePendingTraineesHandler(EsportDataContext esportDataContext)
        {
            this.esportDataContext = esportDataContext;
        }

        public async Task<CommandResult> HandleCommandAsync(ApprovePendingTrainees command)
        {
            if (command.TraineeApprovalModels?.Any() == false) 
            {
                throw new ApplicationException("Request should contain at leat 1 element");
            }

            var traineeIds = command.TraineeApprovalModels.Select(x => x.TraineeId);
            var lessonIds = command.TraineeApprovalModels.Select(x => x.LessonId);

            var pendingTraineeShedules = await esportDataContext.TraineeShedules.Where(x => x.IsPending == true &&
                traineeIds.Any(p => p == x.TraineeId) &&
                lessonIds.Any(p => p == x.LessonId)).ToListAsync();

            pendingTraineeShedules.ForEach(x => { x.IsPending = false; });
            await esportDataContext.SaveChangesAsync();

            return new CommandResult(1);
        }
    }
}
