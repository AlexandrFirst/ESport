using Microsoft.AspNetCore.Authentication;
using System;
using System.Collections.Generic;
using System.Text;

namespace ESportAuthClient.ESportAuthClient
{
    public class ESportClientAuthenticationOptions : AuthenticationSchemeOptions
    {
        public string Authority { get; set; }
    }
}
