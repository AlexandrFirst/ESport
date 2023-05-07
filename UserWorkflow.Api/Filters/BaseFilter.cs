using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace UserWorkflow.Api.Filters
{
    public class BaseFilter: Attribute
    {
        protected IActionResult provideBadResponse(HttpContext context, params string[] messages)
        {
            var messageBody = new { Messages = messages.ToList() };

            return new ObjectResult(messageBody) { StatusCode = 403 };
        }
    }
}
