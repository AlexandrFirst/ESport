using Castle.Core.Logging;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Clients;
using UserWorkflow.Application.Services.Users;
using UserWorkflow.Esport;
using UserWorkflow.Esport.Models;
using UserWorkFlow.Infrastructure.Commands;

namespace UserWorkflow.Application.Commands.UserCommands
{
    public class DeleteUserHandler : ICommandHandler<DeleteUser>
    {
        private readonly IdentityClient identityClient;
        private readonly IUserService userService;
        private readonly EsportDataContext context;
        private readonly ILogger<DeleteUserHandler> logger;

        public DeleteUserHandler(IdentityClient identityClient,
            IUserService userService, EsportDataContext context,
            ILogger<DeleteUserHandler> logger)
        {
            this.identityClient = identityClient;
            this.userService = userService;
            this.context = context;
            this.logger = logger;
        }

        public async Task<CommandResult> HandleCommandAsync(DeleteUser command)
        {
            if (command.DeleteUserEntities == UserTypeEntity.None)
            {
                throw new ApplicationException("Can not delete profiles for UserTypeEntity.None");
            }

            var userId = command.AuthenticatedBy.UserId;
            var userMail = command.AuthenticatedBy.Email;

            using var transaction = context.Database.BeginTransaction();

            var deletedUserProfiles = await userService.DeleteUserProfile(command.DeleteUserEntities, userId, userMail);
            if (deletedUserProfiles.All(x => x.IsSuccess == true) && 
                deletedUserProfiles.Count == Enum.GetValues(typeof(UserTypeEntity)).Length)
            {
                try
                {
                    await identityClient.DeleteIdentityClient(userId);
                }
                catch (Exception ex)
                {
                    var message = $"Rolling back due to: {ex.Message}";
                    logger.LogCritical(message);
                    transaction.Rollback();
                    return new CommandResult(new string[] { message });
                }
            }

            var errors = deletedUserProfiles.Where(x => x.IsSuccess == false).Select(x => $"Error while deleteing profile {x.UserTypeEntity} with id: " + x.EntityId);
            if (errors.Any())
                return new CommandResult(errors);
            else 
                return new CommandResult(1);
        }
    }
}
