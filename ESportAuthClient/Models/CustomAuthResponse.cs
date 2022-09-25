using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;

namespace ESportAuthClient.Models
{
    public class CustomAuthResponse
    {
        public Dictionary<string, string> Claims { get; set; }
    }
}
