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
using UserWorkflow.Application.Utils;
using UserWorkflow.Infrastructure.Security;

namespace UserWorkflow.Application.Services.Confirmation
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
                    Email = confirmationModel.Email
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
            var m_secret = confirmationOptions.Secret;
            var m_audience = confirmationOptions.Audience;
            var m_issuer = confirmationOptions.Issuer;


            string token = JwtHelper.EncodeClaims(new JwtOptions()
            {
                Audience = m_audience,
                Issuer = m_issuer,
                Secret = m_secret
            }, new List<JwtClaims>()
            {
                new JwtClaims(){ Key = ClaimTypes.Role, Value = userRole.RoleName},
                new JwtClaims(){Key = ClaimTypes.Email, Value = confirmationModel.Email},
                new JwtClaims(){ Key = "RoleId", Value = confirmationModel.RoleId.ToString()},
                new JwtClaims(){ Key = "UserId", Value = confirmationModel.UserId.ToString()}
            });

         
            return token;
        }
    }
}
