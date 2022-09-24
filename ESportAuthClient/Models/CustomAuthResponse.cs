using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace ESportAuthClient.Models
{
    public class CustomAuthResponse
    {
        public ClaimsPrincipal ClaimPrincipal { get; set; }
    }
}
