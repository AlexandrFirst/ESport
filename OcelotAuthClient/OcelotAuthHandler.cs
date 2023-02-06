
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Threading.Tasks;

namespace OcelotAuthClient
{
    public class OcelotAuthHandler : AuthenticationHandler<OcelotAuthOptions>
    {
        public OcelotAuthHandler(IOptionsMonitor<OcelotAuthOptions> options,
            ILoggerFactory logger,
            UrlEncoder encoder,
            ISystemClock clock) : base(options, logger, encoder, clock)
        {
        }

        protected override Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            List<Claim> claims = new List<Claim>();

            addClaim(claims, AuthRequestHeaders.Id.Value);
            addClaim(claims, AuthRequestHeaders.Email.Value);
            addClaim(claims, AuthRequestHeaders.Name.Value);
            addClaim(claims, AuthRequestHeaders.Role.Value);

            var claimsIdentity = new ClaimsIdentity(claims,
                        nameof(OcelotAuthHandler));

            var ticket = new AuthenticationTicket(
                      new ClaimsPrincipal(claimsIdentity), this.Scheme.Name);
            return Task.FromResult(AuthenticateResult.Success(ticket));

        }

        private void addClaim(List<Claim> claims, string headerName)
        {
            var headerValue = getHeaderValue(headerName);
            if (!string.IsNullOrEmpty(headerValue)) { claims.Add(new Claim(headerName, headerValue)); }
        }

        private string getHeaderValue(string key)
        {
            var headerExists = Request.Headers.TryGetValue(key, out var value);
            if (headerExists) { return value; }
            else { return string.Empty; }
        }
    }
}
