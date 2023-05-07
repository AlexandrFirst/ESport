using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Models;
using UserWorkflow.Application.ReadModels.User;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Application.Services.Users
{
    public interface IUserService
    {
        public Task<int> CreateTrainee(User userModel, bool needConfirmation = false);
        public Task<int> CreateTrainer(User userModel, bool needConfirmation = false);
        public Task<int> CreateOrUpdateAdministrator(User userModel, List<int> gymId, bool needConfirmation = false);
        public Task<int> CreateOrUpdateOrganisationAdministrator(User userModel, int organistaionId, bool needConfirmation = false);
        public Task<List<DeleteUserResult>> DeleteUserProfile(UserTypeEntity userTypeEntity, int userId, string userLoggedInMail);
    }
}
