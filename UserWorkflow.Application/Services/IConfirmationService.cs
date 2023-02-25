using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Channels;
using System.Threading.Tasks;
using UserWorkflow.Application.Models.User;
using UserWorkflow.Infrastructure.Security;

namespace UserWorkflow.Application.Services
{
    public interface IConfirmationService
    {
        Task<bool> SendConfirmation(UserRole userRole, UserConfirmationModel confirmationModel, CancellationToken c = default);
        ChannelReader<ProfileConfirmationMessage> GetChannelReader();
    }
}
