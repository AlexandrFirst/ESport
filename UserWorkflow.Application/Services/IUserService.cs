using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Models;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Application.Services
{
    public interface IUserService
    {
        public Task<int> CreateTrainee(User userModel);
        public Task<int> CreateTrainer(User userModel);
        public Task<int> CreateOrUpdateAdministrator(User userModel, List<int> gymId);
        public Task<int> CreateOrUpdateOrganisationAdministrator(User userModel, int organistaionId);
    }
}
