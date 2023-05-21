using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Esport;
using UserWorkFlow.Infrastructure.Commands;

namespace UserWorkflow.Application.Commands.Trainer
{
    public class CreateLessonHandler : ICommandHandler<CreateLesson>
    {
        private readonly EsportDataContext esportDataContext;

        public CreateLessonHandler(EsportDataContext esportDataContext)
        {
            this.esportDataContext = esportDataContext;
        }

        public Task<CommandResult> HandleCommandAsync(CreateLesson command)
        {
            throw new NotImplementedException();
        }
    }
}
