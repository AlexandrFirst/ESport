using Castle.Core.Logging;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Channels;
using System.Threading.Tasks;
using UserWorkflow.Application.Configs;
using UserWorkflow.Application.Models.User;
using UserWorkflow.Infrastructure.Security;

namespace UserWorkflow.Application.Services
{
    public class ConfirmationService : IConfirmationService
    {
        private readonly Channel<ProfileConfirmationMessage> channel;
        private readonly ConfirmationOption confirmationOptions;
        private readonly ILogger<ConfirmationService> logger;

        public ConfirmationService(IOptions<ConfirmationOption> confirmationOptions, ILogger<ConfirmationService> logger)
        {
            channel = Channel.CreateUnbounded<ProfileConfirmationMessage>();
            this.confirmationOptions = confirmationOptions.Value;
            this.logger = logger;
        }

        public ChannelReader<ProfileConfirmationMessage> GetChannelReader()
        {
            return channel.Reader;
        }

        public async Task<bool> SendConfirmation(UserRole userRole, UserConfirmationModel confirmationModel, CancellationToken c = default)
        {
            if (channel == null)
            {
                throw new Exception("confirmation message channel is undefined");
            }

            try
            {
                var confirmationToken = generateConfirmationToken(userRole, confirmationModel);

                await channel.Writer.WriteAsync(new ProfileConfirmationMessage() 
                {
                    Token = confirmationToken,
                    Email= confirmationModel.Email
                });
            }
            catch (Exception ex)
            {
                logger.LogError($"Unable to send confirmation due to: {ex.Message}");
                return false;
            }
            return true;
        }

        private string generateConfirmationToken(UserRole userRole, UserConfirmationModel confirmationModel)
        {
            var m_secret = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(confirmationOptions.Secret));
            var m_audience = confirmationOptions.Audience;
            var m_issuer = confirmationOptions.Issuer;

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Role, userRole.RoleName),
                    new Claim(ClaimTypes.Email, confirmationModel.Email),
                    new Claim("RoleId", confirmationModel.RoleId.ToString()),
                    new Claim("UserId", confirmationModel.UserId.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                Issuer = m_issuer,
                Audience = m_audience,
                SigningCredentials = new SigningCredentials(m_secret, SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
