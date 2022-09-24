using ESportAuthClient.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
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
        {
            this.authority = options.CurrentValue.Authority;
        }

        protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            using var client = new HttpClient() { BaseAddress = new Uri("http://localhost:5000") };

            StringValues bearerToken = "";
            var authDataExists = Request.Headers.TryGetValue("Authorization", out bearerToken);
            if (authDataExists && bearerToken.Any()) 
            {
                client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("ESport", bearerToken.First());
            }

            var authResponse = await client.GetAsync("oclelot_validate");
            if (authResponse.IsSuccessStatusCode)
            {
                var contentStream = await authResponse.Content.ReadAsStreamAsync();

                try
                {
                    var authData = await JsonSerializer.DeserializeAsync<CustomAuthResponse>(contentStream, 
                        new JsonSerializerOptions { IgnoreNullValues = true, PropertyNameCaseInsensitive = true });

                    var ticket = new AuthenticationTicket(
                      new ClaimsPrincipal(authData.ClaimPrincipal), this.Scheme.Name);

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
