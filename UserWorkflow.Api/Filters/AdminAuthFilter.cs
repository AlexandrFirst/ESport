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
    public class AdminAuthFilter : BaseFilter, IAsyncAuthorizationFilter
    {
        private readonly EsportDataContext dbContext;
        public AdminAuthFilter(EsportDataContext context)
        {
            this.dbContext = context;
        }

        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
            var roleClaim = context.HttpContext.User.Claims.FirstOrDefault(x => x.Type == "Role");
            if (roleClaim == null)
            {
                context.Result = provideBadResponse(context.HttpContext, "Unable to authenticate administrator role");
            }

            var idClaim = context.HttpContext.User.Claims.FirstOrDefault(x => x.Type == "Id");
            if (idClaim == null)
            {
                context.Result = provideBadResponse(context.HttpContext, "Unable to authenticate administrator id");
            }

            var roles = roleClaim.Value.Split(',');
            var id = int.Parse(idClaim.Value);


            if (!roles.Any(x => x == "OrgAdmin"))
            {
                context.Result = provideBadResponse(context.HttpContext, "No org admin role is present for the user");
            }
            var admin = await dbContext.OrganisationAdministrators.FirstOrDefaultAsync(x => x.UserId == id);
            if (admin == null)
            {
                context.Result = provideBadResponse(context.HttpContext, "Org admin is not found");
            }

            if (!admin.IsConfirmed)
            {
                context.Result = provideBadResponse(context.HttpContext, "Org admin is not confirmed");
            }
        }
    }
}
