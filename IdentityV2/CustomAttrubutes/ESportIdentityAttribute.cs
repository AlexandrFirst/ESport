using Microsoft.AspNetCore.Mvc.Filters;
using System;

namespace IdentityV2.CustomAttrubutes
{
    public class ESportIdentityAttribute : Attribute, IActionFilter
    {
        public void OnActionExecuted(ActionExecutedContext context)
        {
            Console.WriteLine("OnActionExecuted");
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            Console.WriteLine("OnActionExecuting");
        }
    }
}
