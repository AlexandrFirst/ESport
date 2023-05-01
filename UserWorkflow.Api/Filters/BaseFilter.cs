using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserWorkflow.Api.Filters
{
    public class BaseFilter: Attribute
    {
        protected async Task provideBadResponse(HttpContext context, params string[] messages)
        {
            var messageBody = new { Messages = messages.ToList() };

            var encodedBody = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(messageBody));

            context.Response.StatusCode = 403;
            await context.Response.Body.WriteAsync(encodedBody, 0, encodedBody.Length);
        }
    }
}
