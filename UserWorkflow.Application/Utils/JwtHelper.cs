using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Configs;
using UserWorkflow.Infrastructure.Security;

namespace UserWorkflow.Application.Utils
{
    public static class JwtHelper
    {
        public static string EncodeClaims(JwtOptions jwtOptions, List<JwtClaims> jwtClaims) 
        {
            var m_secret = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtOptions.Secret));
            var m_audience = jwtOptions.Audience;
            var m_issuer = jwtOptions.Issuer;

            var tokenHandler = new JwtSecurityTokenHandler();
            var claims = jwtClaims.Select(x => new Claim(x.Key, x.Value)).ToArray();

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(1),
                Issuer = m_issuer,
                Audience = m_audience,
                SigningCredentials = new SigningCredentials(m_secret, SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public static List<JwtClaims> DecodeClaims(string secret, string token) 
        {
            var key = Encoding.ASCII.GetBytes(secret);
            var handler = new JwtSecurityTokenHandler();
            var validations = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false
            };
            var claims = handler.ValidateToken(token, validations, out var tokenSecure);

            return claims.Claims.Select(x => new JwtClaims() { Key = x.Type, Value = x.Value }).ToList();
        }
    }

    public class JwtClaims 
    {
        public string Key { get; set; }
        public string Value { get; set; }
    }

    public class JwtOptions 
    {
        public string Secret { get; set; }
        public string Audience { get; set; }
        public string Issuer { get; set; }
    }
}
