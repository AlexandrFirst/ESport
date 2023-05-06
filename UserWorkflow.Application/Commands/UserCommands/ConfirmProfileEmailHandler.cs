using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Services.Confirmation;
using UserWorkFlow.Infrastructure.Commands;

namespace UserWorkflow.Application.Commands.UserCommands
{
    public class ConfirmProfileEmailHandler : ICommandHandler<ConfirmProfileEmail>
    {
        private readonly IVerifingService verifingService;

        public ConfirmProfileEmailHandler(IVerifingService verifingService)
        {
            this.verifingService = verifingService;
        }

        public async Task<CommandResult> HandleCommandAsync(ConfirmProfileEmail command)
        {
            var isEmailVerified = await verifingService.VerifyUserProfileEmail(command.Token);
            if (!isEmailVerified) {
                throw new ApplicationException("Token can not be verified");
            }
            return new CommandResult(1);
        }
    }
}
