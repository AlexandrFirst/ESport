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
    public class AdminAuthFilter : Attribute, IAsyncAuthorizationFilter
    {
        private readonly EsportDataContext dbContext;
        public AdminAuthFilter(EsportDataContext context)
        {
            this.dbContext = context;
        }

        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
            var roleClaim = context.HttpContext.User.Claims.FirstOrDefault(x => x.Value == "Role");
            if (roleClaim == null)
            {
                await provideBadResponse(context.HttpContext,
                    "Unable to authenticate administrator role");
                return;
            }

            var idClaim = context.HttpContext.User.Claims.FirstOrDefault(x => x.Value == "Id");
            if (idClaim == null)
            {
                await provideBadResponse(context.HttpContext,
                    "Unable to authenticate administrator id");
                return;
            }

            var roles = roleClaim.Value.Split(',');
            var id = int.Parse(idClaim.Value);


            if (roles.Any(x => x == "OrgAdmin"))
            {
                await provideBadResponse(context.HttpContext, "No org admin role is present for the user");
            }
            var admin = await dbContext.OrganisationAdministrators.FirstOrDefaultAsync(x => x.UserId == id);
            if (admin == null)
            {
                await provideBadResponse(context.HttpContext, "Org admin is not found");
            }

            if (!admin.IsConfirmed)
            {
                await provideBadResponse(context.HttpContext, "Org admin is not confirmed");
            }

        }

        private async Task provideBadResponse(HttpContext context, params string[] messages)
        {
            var messageBody = new { Messages = messages.ToList() };

            var encodedBody = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(messageBody));

            context.Response.StatusCode = 403;
            await context.Response.Body.WriteAsync(encodedBody, 0, encodedBody.Length);
        }


    }
}
