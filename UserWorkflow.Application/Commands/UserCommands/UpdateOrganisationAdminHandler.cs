using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.ReadModels;
using UserWorkflow.Application.Services.Users;
using UserWorkflow.Esport;
using UserWorkflow.Esport.Models;
using UserWorkFlow.Infrastructure.Commands;

namespace UserWorkflow.Application.Commands.User
{
    public class UpdateOrganisationAdminHandler : BaseUserHandler, ICommandHandler<UpdateOrganisationAdmin>
    {
        private readonly EsportDataContext context;
        private readonly IUserService userService;

        public UpdateOrganisationAdminHandler(EsportDataContext context, IUserService userService)
        {
            this.context = context;
            this.userService = userService;
        }

        public async Task<CommandResult> HandleCommandAsync(UpdateOrganisationAdmin command)
        {
            if (command.UpdateUserInfo.UserId < 0)
            {
                throw new ApplicationException($"User id: {command.UpdateUserInfo.UserId} must be greater than -1");
            }

            var organisationAdmin = await context.OrganisationAdministrators.FirstOrDefaultAsync(x => x.Email.Equals(command.UpdateUserInfo.Email));
            if (organisationAdmin == null)
            {
                organisationAdmin = createUser<OrganisationAdministrators>(command.UpdateUserInfo, false);
            }

            var orgnistaionAdminId = await userService.CreateOrUpdateOrganisationAdministrator(organisationAdmin, command.OrganisationId);
           
            return new CommandResult(orgnistaionAdminId);
        }
    }
}
