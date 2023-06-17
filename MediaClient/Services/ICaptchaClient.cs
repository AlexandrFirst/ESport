using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediaClient.Services
{
    public interface ICaptchaClient
    {
        public Task<bool> ValidateHttpContext(HttpContext httpContext);
    }
}
