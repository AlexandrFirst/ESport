using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Clients;
using UserWorkflow.Application.Models.User;
using UserWorkflow.Esport;
using UserWorkflow.Esport.Models;
using UserWorkFlow.Infrastructure.Queries;

namespace UserWorkflow.Application.Requests.User
{
    public class GetUserHandler : IRequestHandler<GetUser, GetUserResult>
    {
        private readonly EsportDataContext context;
        private readonly IdentityClient identityClient;

        public GetUserHandler(EsportDataContext context, IdentityClient identityClient)
        {
            this.context = context;
            this.identityClient = identityClient;
        }

        public async Task<RequestResult<GetUserResult>> HandleQueryAsync(GetUser request)
        {
            if (request.UserId < 1)
            {
                throw new Exception($"User id {request.UserId} is less than 1");
            }

            var administrator = await context.Administrators.FirstOrDefaultAsync(x => x.UserId == request.UserId);
            var organistaionAdministartor = await context.OrganisationAdministrators.Where(x => x.UserId == request.UserId).ToListAsync();
            var traineeInfo = await context.Trainees.FirstOrDefaultAsync(x => x.UserId == request.UserId);
            var trainerInfo = await context.Trainers.FirstOrDefaultAsync(x => x.UserId == request.UserId);
            var identityInfo = await identityClient.GetIdentityUserInfoAsync(request.UserId);

            var userInfo = new GetUserResult()
            {
                UserAdminInfo = administrator != null ? handleAdminInfo(administrator) : null,
                UserIdentityInfo = identityInfo,
                UserOrganisationAdminInfos = organistaionAdministartor.Any() ? organistaionAdministartor.Select(x => handleUserAdminOrgInfo(x)).ToList() :
                    new List<UserOrganisationAdminInfo>(),
                UserTraineeInfo = traineeInfo != null ? handleUserTraineeInfo(traineeInfo) : null,
                UserTrainerInfo = trainerInfo != null ? handleUserTrainerInfo(trainerInfo) : null,
            };

            return new RequestResult<GetUserResult>(userInfo);
        }

        private UserTrainerInfo handleUserTrainerInfo(Trainer trainer)
        {
            var model = UserIdentityInfo.InitFromDbUser(trainer) as UserTrainerInfo;
            model.Id = trainer.Id;
            model.Info = trainer.Info;
            return model;
        }

        private UserTraineeInfo handleUserTraineeInfo(Trainee trainee)
        {
            var model = UserIdentityInfo.InitFromDbUser(trainee) as UserTraineeInfo;
            model.Id = trainee.Id;
            model.Info = trainee.Info;
            return model;
        }

        private UserOrganisationAdminInfo handleUserAdminOrgInfo(OrganisationAdministrators organisationAdministrators)
        {
            var model = UserIdentityInfo.InitFromDbUser(organisationAdministrators) as UserOrganisationAdminInfo;
            model.Id = organisationAdministrators.Id;
            model.OrganisationName = organisationAdministrators.Organisation?.Name;
            model.GymOrganisationId = organisationAdministrators.Organisation?.Id;
            return model;
        }

        private UserAdminInfo handleAdminInfo(Administrators administrators)
        {
            var model = UserIdentityInfo.InitFromDbUser(administrators) as UserAdminInfo;
            model.Id = administrators.Id;
            model.UserGyms = administrators.GymAdministrators.Select(x => new GymInfo()
            {
                Address = x.Gym.Address,
                CloseTime = x.Gym.CloseTime,
                Name = x.Gym.Name,
                OpenTime = x.Gym.OpenTime,
                GymOrganisationId = x.Gym.OrganisationId ?? null,
                OrganisationName = x.Gym.OrganisationId.HasValue ? x.Gym.Organisation.Name : null
            }).ToList();
            return model;
        }
    }
}
