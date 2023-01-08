using System.Net;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using System.Web.Http;
using System.Net.Http;

namespace StreamingService.Attributes
{
    public class ValidateMimeMultipartContentFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            if (!actionContext.Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }
        }

        public override void OnActionExecuted(HttpActionExecutedContext actionExecutedContext)
        {

        }

    }
}
