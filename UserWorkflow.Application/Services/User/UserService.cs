using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RMQEsportClient;
using RMQEsportClient.QueueConfigs;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Extensions;
using UserWorkflow.Application.Models.Rmq;
using UserWorkflow.Application.ReadModels.User;
using UserWorkflow.Esport;
using UserWorkflow.Esport.Models;
using UserWorkflow.Infrastructure.Security;

namespace UserWorkflow.Application.Services.Users
{
    public class UserService : IUserService
    {
        private readonly EsportDataContext esportDataContext;
        private readonly IMessageProducer messageProducer;
        private readonly IMapper mapper;
        private readonly ILogger<UserService> logger;

        private const string CREATE_ACTION = "Create";
        private const string UPDATE_ACTION = "Update";
        private const string DELETE_ACTION = "Delete";

        public UserService(EsportDataContext esportDataContext,
            IMessageProducer messageProducer, IMapper mapper, ILogger<UserService> logger)
        {
            this.esportDataContext = esportDataContext;
            this.messageProducer = messageProducer;
            this.mapper = mapper;
            this.logger = logger;
        }

        public async Task<int> CreateOrUpdateAdministrator(User userModel, List<int> gymIds)
        {
            var admin = await esportDataContext.Administrators.FirstOrDefaultAsync(x => x.UserId == userModel.UserId);
            string action = string.Empty;

            if (admin == null)
            {
                List<Gym> gyms = await esportDataContext.Gyms.Where(x => gymIds.Any(p => p == x.Id)).ToListAsync();
                List<GymAdministrators> gymAdministrators = gyms.Select(x => new GymAdministrators()
                {
                    Gym = x
                }).ToList();

                admin = userModel as Administrators;
                admin.GymAdministrators.AddRange(gymAdministrators);
                await esportDataContext.Administrators.AddAsync(admin);

                action = CREATE_ACTION;
            }
            else
            {
                MapUser(userModel, admin);

                var gymsToDelete = admin.GymAdministrators.Where(x => !gymIds.Any(g => g == x.Id)).ToList();
                var gymsToAdd = gymIds.Where(x => !admin.GymAdministrators.Any(g => x == g.Id)).Select(x => new GymAdministrators()
                {
                    GymId = x
                }).ToList();

                admin.GymAdministrators.RemoveAll(x => gymsToDelete.Any(p => x.Id == p.Id));
                admin.GymAdministrators.AddRange(gymsToAdd);
                action = UPDATE_ACTION;
            }

            await saveUser(admin, action, "Error while Create/Updating administrator");
            return admin.Id;
        }

        public async Task<int> CreateOrUpdateOrganisationAdministrator(User userModel, int organistaionId)
        {
            var organistaion = esportDataContext.Organisations.FirstOrDefaultAsync(x => x.Id == organistaionId);
            string action = string.Empty;

            if (organistaion == null)
            {
                throw new Exception($"Organistaion with id: {organistaionId} is not found");
            }

            var organisationAdministrator = await esportDataContext.OrganisationAdministrators.FirstOrDefaultAsync(x => x.UserId == userModel.UserId);
            if (organisationAdministrator == null)
            {
                OrganisationAdministrators administrator = userModel as OrganisationAdministrators;
                administrator.OrganisationId = organistaionId;
                await esportDataContext.OrganisationAdministrators.AddAsync(administrator);
                action = CREATE_ACTION;
            }
            else
            {
                MapUser(userModel, organisationAdministrator);
                organisationAdministrator.IsProfileConfirmed = false;
                organisationAdministrator.OrganisationId = organisationAdministrator.OrganisationId;
                action = UPDATE_ACTION;
            }

            await esportDataContext.SaveChangesAsync();

            await saveUser(organisationAdministrator, action, "Error while Create/Updating OrganisationAdministrator");

            return organisationAdministrator.Id;
        }

        public async Task<int> CreateTrainee(User userModel)
        {
            var m_trainee = await esportDataContext.Trainees.FirstOrDefaultAsync(x => x.UserId == userModel.UserId);
            string action = string.Empty;

            if (m_trainee == null)
            {
                m_trainee = (Trainee)userModel;

                await esportDataContext.Trainees.AddAsync(m_trainee);
                action = CREATE_ACTION;
            }
            else
            {
                MapUser(userModel, m_trainee);
                action = UPDATE_ACTION;
            }

            await esportDataContext.SaveChangesAsync();

            await saveUser(m_trainee, action, "Error while Create/Updating Trainee");

            return m_trainee.Id;
        }

        public async Task<int> CreateTrainer(User userModel)
        {
            var trainer = await esportDataContext.Trainers.FirstOrDefaultAsync(x => x.UserId == userModel.UserId);
            string action = string.Empty;
            if (trainer == null)
            {
                trainer = userModel as Trainer;

                await esportDataContext.Trainers.AddAsync(trainer);
                action = CREATE_ACTION;
            }
            else
            {
                MapUser(userModel, trainer);
                action = UPDATE_ACTION;
            }

            await saveUser(trainer, action, "Error while Create/Updating Trainer");
            
            return trainer.Id;
        }


        public async Task<List<DeleteUserResult>> DeleteUserProfile(UserTypeEntity userTypeEntity,
            int userId, string userLoggedInMail)
        {
            var deletedInfoResult = new List<DeleteUserResult>();

            if (userTypeEntity.Contains(UserTypeEntity.Trainee))
            {
                var deletedTraineeResult = await deleteEntityOperation(esportDataContext.Trainees,
                    userId, userLoggedInMail);
                deletedInfoResult.Add(deletedTraineeResult);
            }

            if (userTypeEntity.Contains(UserTypeEntity.Trainer))
            {
                var deletedTraineeResult = await deleteEntityOperation(esportDataContext.Trainers,
                    userId, userLoggedInMail);
                deletedInfoResult.Add(deletedTraineeResult);
            }

            if (userTypeEntity.Contains(UserTypeEntity.Admin))
            {
                var deletedTraineeResult = await deleteEntityOperation(esportDataContext.Administrators,
                    userId, userLoggedInMail);
                deletedInfoResult.Add(deletedTraineeResult);
            }

            if (userTypeEntity.Contains(UserTypeEntity.Organisator))
            {
                var deletedTraineeResult = await deleteEntityOperation(esportDataContext.OrganisationAdministrators,
                    userId, userLoggedInMail);
                deletedInfoResult.Add(deletedTraineeResult);
            }

            await esportDataContext.SaveChangesAsync();

            return deletedInfoResult;
        }

        private async Task saveUser(User user, string action, string errorMessage)
        {
            var transacaction = await esportDataContext.Database.BeginTransactionAsync();

            await esportDataContext.SaveChangesAsync();

            var isNotified = notifyCompetitionService(user, role: UserRole.LocalAdmin.RoleName, action: action);
            if (!isNotified)
            {
                await transacaction.RollbackAsync();
                throw new ApplicationException(errorMessage);
            }

            await transacaction.CommitAsync();
        }

        private void MapUser(User fromUser, User toUser)
        {
            toUser.Surname = fromUser.Surname;
            toUser.Email = fromUser.Email;
            toUser.Name = fromUser.Name;
            toUser.TelephoneNumber = fromUser.TelephoneNumber;
        }

        private bool notifyCompetitionService(User user, string action, string role)
        {
            RmqUserModel notifyModel = mapper.Map<RmqUserModel>(user,
                opt => opt.AfterMap((src, des) =>
                {
                    des.Role = role;
                    des.Operation = action;
                }));

            try
            {
                messageProducer.SendMessageToTopic(notifyModel, QueueConfigName.ESportCompetitionConfig);
            }
            catch (Exception ex)
            {
                logger.LogError("Unable to send message due to: " + ex.Message);
                return false;
            }
            return true;
        }


        private async Task<DeleteUserResult> deleteEntityOperation<T>(IQueryable<T> query, int userId, string userLoggedInMail) where T : User
        {
            var deleteUserResult = new DeleteUserResult() { IsSuccess = false, EntityId = 0, UserTypeEntity = UserTypeEntity.None };

            var user = await query.FirstOrDefaultAsync(x => x.UserId == userId);
            if (user != null)
            {
                var userType = typeof(T);

                deleteUserResult.UserTypeEntity = user.GetUserType;
                deleteUserResult.IsSuccess = true;
                var keyProp = userType.GetProperties()
                    .FirstOrDefault(x => x.GetCustomAttributes(false)
                    .Any(a => a.GetType() == typeof(KeyAttribute)));
                if (keyProp == null) { }
                var keyPropValue = keyProp.GetValue(user);
                deleteUserResult.EntityId = (int)keyPropValue;

                notifyCompetitionService(user, action: DELETE_ACTION, role: deleteUserResult.UserTypeEntity.GetRole().RoleName);
                esportDataContext.Remove(user);
            }
            return deleteUserResult;
        }
    }
}
