using MediaClient.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Threading.Tasks;

namespace IdentityV2.CustomAttrubutes
{
    public class CaptchaAttribute : IAsyncActionFilter
    {
        private readonly ICaptchaClient captchaClient;

        public CaptchaAttribute(ICaptchaClient captchaClient)
        {
            this.captchaClient = captchaClient;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var isTokenValid = await captchaClient.ValidateHttpContext(context.HttpContext);
            if (isTokenValid)
            {
                await next();
            }
            else 
            {
                context.Result = new BadRequestObjectResult("unable to validate token");
                return;
            }
        }
    }
}
