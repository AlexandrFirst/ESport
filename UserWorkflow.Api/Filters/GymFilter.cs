using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Esport;

namespace UserWorkflow.Api.Filters
{

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class GymFilter : BaseFilter, IAsyncActionFilter
    {
        private readonly EsportDataContext dbContext;
        public GymFilter(EsportDataContext context)
        {
            this.dbContext = context;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var requestingGymExists = context.ActionArguments.TryGetValue("gymId", out var gymId);
            if (!requestingGymExists) 
            {
                context.Result = provideBadResponse(context.HttpContext, "Invalid route template data");
                return;
            }

            var idClaim = context.HttpContext.User.Claims.FirstOrDefault(x => x.Value == "Id");
            if (idClaim == null)
            {
                context.Result = provideBadResponse(context.HttpContext,
                    "Unable to authenticate administrator id");
                return;
            }

            var _gymId = int.Parse(gymId.ToString());
            var userId = int.Parse(idClaim.Value.ToString());
            var gymAdmin = await dbContext.GymAdministrators.FirstOrDefaultAsync(x => x.GymId == _gymId && x.Administrators.UserId == userId);
            if (gymAdmin == null || gymAdmin?.IsConfirmed != true) 
            {
                var orgAdmin = await dbContext.OrganisationAdministrators.FirstOrDefaultAsync(x => x.Organisation.Gyms.Any(k => k.Id == _gymId) && x.Id == userId);
                if (orgAdmin == null || orgAdmin.IsConfirmed == false) 
                {
                    context.Result = provideBadResponse(context.HttpContext,
                    $"Gym or organisation administrator for gym {_gymId} and user {userId} is not confirmed or found");
                    return;
                }
            }

            await next();
        }

      

    }
}
