using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserWorkflow.Application.Services.Confirmation
{
    public interface IVerifingService
    {
        public Task<bool> VerifyUserProfileEmail(string token);
    }
}
