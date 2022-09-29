using ESportAuthClient.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using System.Text.Json;
using System.Threading.Tasks;

namespace ESportAuthClient.ESportAuthClient
{
    public class ESportClientAuthenticationHandler : AuthenticationHandler<ESportClientAuthenticationOptions>
    {
        private readonly string authority;
        public ESportClientAuthenticationHandler(IOptionsMonitor<ESportClientAuthenticationOptions> options,
            ILoggerFactory logger,
            UrlEncoder encoder,
            ISystemClock clock) :
            base(options, logger, encoder, clock)
        { }

        protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            using var client = new HttpClient() { BaseAddress = new Uri(Options.Authority) };
            Console.WriteLine(Options.Authority);
            string token = "";
            bool authDataExists = false;

            var authCookieExists = Request.Cookies.TryGetValue("ESportCookie", out token);
            if (!authDataExists)
            {
                StringValues authTokens = new StringValues();
                authDataExists = Request.Headers.TryGetValue("Authorization", out authTokens);
                if (authDataExists)
                {
                    token = authTokens.FirstOrDefault();
                }
            }
            if (authDataExists) 
            {
                client.DefaultRequestHeaders.Add("Authorization", token);
            }


            var authResponse = await client.GetAsync("User/oclelot_validate");
            if (authResponse.IsSuccessStatusCode)
            {
                var contentStream = await authResponse.Content.ReadAsStreamAsync();

                try
                {
                    var authData = await JsonSerializer.DeserializeAsync<CustomAuthResponse>(contentStream,
                        new JsonSerializerOptions { IgnoreNullValues = true, PropertyNameCaseInsensitive = true });

                    Claim idClaim = new Claim("Id", authData.Claims["Id"]);
                    Claim nameClaim = new Claim("Name", authData.Claims["Name"]);
                    Claim emailClaim = new Claim("Email", authData.Claims["Email"]);
                    Claim roleClaim = new Claim("Role", authData.Claims["Role"]);

                    var claimsIdentity = new ClaimsIdentity(new List<Claim>() { idClaim, nameClaim, emailClaim, roleClaim },
                      nameof(ESportClientAuthenticationHandler));

                    var ticket = new AuthenticationTicket(
                               new ClaimsPrincipal(claimsIdentity), this.Scheme.Name);

                    return AuthenticateResult.Success(ticket);
                }
                catch (JsonException)
                {
                    return AuthenticateResult.Fail("Invalid JSON.");
                }
            }
            else
            {
                var errorMessage = await authResponse.Content.ReadAsStringAsync();
                return AuthenticateResult.Fail(errorMessage);
            }


        }
    }
}
