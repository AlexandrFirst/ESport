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
        public Task<int> CreateAdministrator(User userModel, int gymId);
        public Task<int> CreateOrganisationAdministrator(User userModel, int organistaionId);
        public Task<int> CreateTrainer(User userModel);
    }
}
