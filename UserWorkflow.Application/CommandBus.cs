using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using UserFlow.Infrastructure.Commands;
using UserWorkflow.Application.Base;
using UserWorkflow.Application.Extensions;

namespace UserWorkflow.Application
{
    public class CommandBus: ICommandBus
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly IValidateCommand _validateCommand;

        public CommandBus(IServiceProvider serviceProvider, IValidateCommand validateCommand)
        {
            _serviceProvider = serviceProvider;
            _validateCommand = validateCommand;
        }

        public async Task<ICommandResult> ExecuteAsync<T>(ClaimsPrincipal user, T command) 
            where T : ICommand
        {
            var validationResult = _validateCommand.Validate(command);
            if (validationResult.Any()) 
            {
                return new CommandResult(validationResult);
            }

            var baseCommand = command as BaseCommand;
            var isAuthorized = user.TryValidateUserClaims(out var authorizedBy);
            if (isAuthorized) 
            {
                baseCommand.AuthenticatedBy = authorizedBy;
            }

            var handler = (ICommandHandler<T>)_serviceProvider.GetService(typeof(ICommandHandler<T>));
            if (handler != null) 
            {
                return await handler.HandleCommandAsync(command);
            }

            return new CommandResult(new List<string>() { $"Unable to find command handler for {typeof(T).FullName}"});
        }
    }
}
