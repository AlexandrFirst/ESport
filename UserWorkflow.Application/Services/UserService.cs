using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RMQEsportClient;
using RMQEsportClient.QueueConfigs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Models.Rmq;
using UserWorkflow.Esport;
using UserWorkflow.Esport.Models;
using UserWorkflow.Infrastructure.Security;

namespace UserWorkflow.Application.Services
{
    public class UserService : IUserService
    {
        private readonly EsportDataContext esportDataContext;
        private readonly IMessageProducer messageProducer;
        private readonly IMapper mapper;

        public UserService(EsportDataContext esportDataContext, IMessageProducer messageProducer, IMapper mapper)
        {
            this.esportDataContext = esportDataContext;
            this.messageProducer = messageProducer;
            this.mapper = mapper;
        }

        public async Task<int> CreateAdministrator(User userModel, int gymId)
        {
            var gym = await esportDataContext.Gyms.FirstOrDefaultAsync(x => x.Id == gymId);
            if (gym == null)
            {
                throw new Exception($"Gym with id: {gymId} is not found");
            }

            Administrators administrator = userModel as Administrators;
            administrator.GymAdministrators.Add(new GymAdministrators() { Gym = gym });
            await esportDataContext.Administrators.AddAsync(administrator);
            await esportDataContext.SaveChangesAsync();

            notifyCompetitionService(administrator, UserRole.LocalAdmin.RoleName, "Create");

            return administrator.Id;
        }

        public async Task<int> CreateOrganisationAdministrator(User userModel, int organistaionId)
        {
            var organistaion = esportDataContext.Organisations.FirstOrDefaultAsync(x => x.Id == organistaionId);
            if (organistaion == null)
            {
                throw new Exception($"Organistaion with id: {organistaionId} is not found");
            }

            OrganisationAdministrators administrator = userModel as OrganisationAdministrators;
            administrator.OrganisationId = organistaionId;
            await esportDataContext.OrganisationAdministrators.AddAsync(administrator);
            await esportDataContext.SaveChangesAsync();

            notifyCompetitionService(administrator, UserRole.OrgAdmin.RoleName, "Create");
         
            return administrator.Id;
        }

        public async Task<int> CreateTrainee(User userModel)
        {
            Trainee trainee = userModel as Trainee;

            await esportDataContext.Trainees.AddAsync(trainee);
            await esportDataContext.SaveChangesAsync();

            notifyCompetitionService(trainee, UserRole.Trainee.RoleName, "Create");

            return trainee.Id;
        }

        public async Task<int> CreateTrainer(User userModel)
        {
            Trainer trainer = userModel as Trainer;

            await esportDataContext.Trainers.AddAsync(trainer);
            await esportDataContext.SaveChangesAsync();

            notifyCompetitionService(trainer, UserRole.Trainer.RoleName, "Create");
            return trainer.Id;
        }

        private void notifyCompetitionService(User user, string action, string role)
        {
            UserModel notifyModel = mapper.Map<UserModel>(user,
                opt => opt.AfterMap((src, des) =>
                {
                    des.Role = role;
                    des.Operation = action;
                }));

            messageProducer.SendMessageToTopic(user, QueueConfigName.ESportCompetitionConfig);
        }
    }
}
