using IdentityV2.CustomAttrubutes;
using IdentityV2.Infrastructure.Core;
using IdentityV2.Utils;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Primitives;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace IdentityV2.CustomAuth
{
    public class ESportAuthenticationHandler : AuthenticationHandler<ESportAuthenticationOptions>
    {
        private readonly IAuthorizationCache authorizationCache;
        private readonly IJWTManagerRepository customAuthenticationManager;
        private readonly IConfiguration configuration;

        public ESportAuthenticationHandler(
            IOptionsMonitor<ESportAuthenticationOptions> options,
            ILoggerFactory logger,
            UrlEncoder encoder,
            ISystemClock clock,
            IAuthorizationCache authorizationCache,
            IJWTManagerRepository customAuthenticationManager,
            IConfiguration configuration)
            : base(options, logger, encoder, clock)
        {
            this.authorizationCache = authorizationCache;
            this.customAuthenticationManager = customAuthenticationManager;
            this.configuration = configuration;
        }

        protected override Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            string authData = "";
            bool authDataExists = false;

            var authCookieExists = Request.Cookies.TryGetValue("ESportCookie", out authData);
            if (!authDataExists)
            {
                StringValues authTokens = new StringValues();
                authDataExists = Request.Headers.TryGetValue("Authorization", out authTokens);
                if (authDataExists)
                {
                    authData = authTokens.FirstOrDefault();
                }
            }

            if (string.IsNullOrEmpty(authData))
            {
                authCookieExists = false;
            }

            var endpoint = Context.GetEndpoint();
            if (endpoint?.Metadata?.GetMetadata<IAllowAnonymous>() != null)
            {
                return Task.FromResult(AuthenticateResult.NoResult());
            }

            Claim[] claims = new Claim[0];

            if (endpoint?.Metadata?.GetMetadata<ESportIdentityAttribute>() != null)
            {
                if (!authDataExists)
                {
                    claims = new[] {
                        new Claim("IsAuthentificated", false.ToString())
                    };
                }
                else
                {
                    try
                    {
                        claims = GetClaimsFromToken(authData);
                    }
                    catch
                    {
                        claims = new[] {
                            new Claim("IsAuthentificated", false.ToString())};
                    }
                }
            }

            if (endpoint?.Metadata?.GetMetadata<AuthorizeAttribute>() != null)
            {
                if (!authDataExists)
                {
                    return Task.FromResult(AuthenticateResult.Fail("No security info provided"));
                }
                else
                {
                    try
                    {
                        claims = GetClaimsFromToken(authData);
                    }
                    catch
                    {
                        return Task.FromResult(AuthenticateResult.Fail("No security info provided"));
                    }
                }
            }

            if (!claims.Any()) 
            {
                return Task.FromResult(AuthenticateResult.NoResult());
            }

            var claimsIdentity = new ClaimsIdentity(claims,
                        nameof(ESportAuthenticationHandler));

            var ticket = new AuthenticationTicket(
                       new ClaimsPrincipal(claimsIdentity), this.Scheme.Name);
            return Task.FromResult(AuthenticateResult.Success(ticket));
        }

        private Claim[] GetClaimsFromToken(string token)
        {
            Regex regex = new Regex(ESportAuthSchemeConstant.ESportToken);
            Match match = regex.Match(token);
            if (match.Success)
            {
                token = match.Groups["token"].Value;
            }
            else 
            {
                throw new SecurityTokenDecryptionFailedException();
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var secret = configuration.GetSection("JWT")["Key"];
            var audience = configuration.GetSection("JWT")["Audience"];
            var issuer = configuration.GetSection("JWT")["Issuer"];
            var key = Encoding.ASCII.GetBytes(secret);
            tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = true,
                ValidateAudience = true,
                ClockSkew = TimeSpan.Zero,
                ValidIssuer = issuer,
                ValidAudience = audience
            }, out SecurityToken validatedToken);

            var jwtToken = (JwtSecurityToken)validatedToken;

            var id = jwtToken.Claims.Where(x => x.Type == UserClaims.Id).First();
            var name = jwtToken.Claims.Where(x => x.Type == UserClaims.Name).First();
            var email = jwtToken.Claims.Where(x => x.Type == UserClaims.Email).First();
            var role = jwtToken.Claims.Where(x => x.Type == UserClaims.Role).First();

            var existingToken = authorizationCache.CheckUserTokenInCache(int.Parse(id.Value));
            if (!string.Equals(token, existingToken)) { throw new Exception("Token is changed"); }
    
            return new[] { id, name, email, role };
        }
    }
}
