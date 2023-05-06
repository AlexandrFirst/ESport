using Castle.Core.Configuration;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;
using UserWorkflow.Application.Clients;
using UserWorkflow.Application.Commands.Gym;
using UserWorkflow.Application.Commands.OrgAdminCommands;
using UserWorkflow.Application.Commands.User;
using UserWorkflow.Application.Commands.UserCommands;
using UserWorkflow.Application.Configs;
using UserWorkflow.Application.Requests.GymAdmin;
using UserWorkflow.Application.Requests.User;
using UserWorkflow.Application.Services.Confirmation;
using UserWorkflow.Application.Services.Users;
using UserWorkflow.Esport.Models;
using UserWorkflow.Infrastructure.Paging;
using UserWorkFlow.Infrastructure.Commands;
using UserWorkFlow.Infrastructure.Queries;

namespace UserWorkflow.Application
{
    public class Bootstrapper
    {
        public static void RegisterIocContainers(IServiceCollection services, Microsoft.Extensions.Configuration.IConfiguration configuration)
        {
            var authorityUrl = configuration.GetSection("IdentityClient")["Address"];
            services.AddHttpClient("IdentityClient", options =>
            {
                options.BaseAddress = new Uri(authorityUrl);
            });

            services.AddOptions<RabbitMqOptions>().Bind(configuration.GetSection("RabbitMq"));
            services.AddOptions<MailOption>().Bind(configuration.GetSection("MailOption"));
            services.AddOptions<ConfirmationOption>().Bind(configuration.GetSection("ConfirmationOption"));

            services.AddTransient<ICommandBus, CommandBus>();
            services.AddTransient<IRequestBus, RequestBus>();
            services.AddTransient<IValidateCommand, ValidateCommand>();
            services.AddTransient<IValidateRequest, ValidateRequest>();

            services.AddTransient<IUserService, UserService>();

            services.AddTransient<IRequestHandler<GetUser, GetUserResult>, GetUserHandler>();

            services.AddTransient<ICommandHandler<UpdateAdmin>, UpdateAdminHandler>();
            services.AddTransient<ICommandHandler<UpdateOrganisationAdmin>, UpdateOrganisationAdminHandler>();
            services.AddTransient<ICommandHandler<UpdateTrainee>, UpdateTraineeHandler>();
            services.AddTransient<ICommandHandler<UpdateTrainer>, UpdateTrainerHandler>();
            services.AddTransient<ICommandHandler<ConfirmProfileEmail>, ConfirmProfileEmailHandler>();
            services.AddTransient<ICommandHandler<DeleteUser>, DeleteUserHandler>();


            services.AddTransient<IRequestHandler<GetPendingAdmins, GetPendingAdminsResult>, GetPendingAdminsHandler>();
            services.AddTransient<ICommandHandler<ConfirmAdmin>, ConfirmAdminHandler>();
            services.AddTransient<ICommandHandler<ConfirmGymAdmin>, ConfirmGymAdminHandler>();
            services.AddTransient<IRequestHandler<GetPendingTrainers, GetPendingTrainersResult>, GetPendingTrainersHandler>();
            services.AddTransient<IRequestHandler<GetGymTimeTable, GetGymTimeTableResponse>, GetGymTimeTableHandler>();
            services.AddTransient<ICommandHandler<OpenTrainerRequest>, OpenTrainerRequestHandler>();
            services.AddTransient<ICommandHandler<CloseTrainerRequest>, CloseTrainerRequestHandler>();
            services.AddTransient<ICommandHandler<UpdateTrainerRequest>, UpdateTrainerRequestHandler>();
            services.AddTransient<ICommandHandler<ApproveTrainerResponse>, ApproveTrainerResponseHandler>();
            services.AddTransient<ICommandHandler<DeclineTrainerResponse>, DeclineTrainerResponseHandler>();

            services.AddTransient<ICommandHandler<CreateOrganisation>, CreateOrganisationHandler>();
            services.AddTransient<ICommandHandler<UpdateOrganisation>, UpdateOrganisationHandler>();
            services.AddTransient<ICommandHandler<DeleteOrganisation>, DeleteOrganisationHandler>();


            services.AddScoped<IdentityClient>();

            services.AddSingleton<IConfirmationService, ConfirmationService>();
            services.AddTransient<IVerifingService, VerifingService>();

            services.AddTransient<IPaging<OrganisationAdministrators>, Paging<OrganisationAdministrators>>();
            services.AddTransient<IPaging<GymAdministrators>, Paging<GymAdministrators>>();
            services.AddTransient<IPaging<TrainerResponse>, Paging<TrainerResponse>>();

            services.AddAutoMapper(Assembly.GetExecutingAssembly());

            Esport.Bootstrapper.RegisterIocContainers(services, configuration);
            Images.Bootstrapper.RegisterIocContainers(services, configuration);

            RMQEsportClient.Bootstrapper.RegisterIocContainers(services, configuration);
        }
    }
}
