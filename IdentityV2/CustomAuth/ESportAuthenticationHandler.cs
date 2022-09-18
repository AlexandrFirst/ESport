using IdentityV2.Infrastructure.Core;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Threading.Tasks;

namespace IdentityV2.CustomAuth
{
    public class ESportAuthenticationHandler : AuthenticationHandler<ESportAuthenticationOptions>
    {
        private readonly IJWTManagerRepository customAuthenticationManager;

        public ESportAuthenticationHandler(
            IOptionsMonitor<ESportAuthenticationOptions> options,
            ILoggerFactory logger,
            UrlEncoder encoder,
            ISystemClock clock,
            IJWTManagerRepository customAuthenticationManager)
            : base(options, logger, encoder, clock)
        {
            this.customAuthenticationManager = customAuthenticationManager;
        }

        protected override Task<AuthenticateResult> HandleAuthenticateAsync()
        {



            var endpoint = Context.GetEndpoint();
            if (endpoint?.Metadata?.GetMetadata<IAllowAnonymous>() != null)
            {
                return Task.FromResult(AuthenticateResult.NoResult());
            }

            var claims = new[] {
                    new Claim("Name", "temp"),
                    new Claim("Email", "temp"),
                    new Claim("Id", "temp") };

            // generate claimsIdentity on the name of the class
            var claimsIdentity = new ClaimsIdentity(claims,
                        nameof(ESportAuthenticationHandler));

            

            var ticket = new AuthenticationTicket(
                       new ClaimsPrincipal(claimsIdentity), this.Scheme.Name);
            return Task.FromResult(AuthenticateResult.Success(ticket));
        }
    }
}
