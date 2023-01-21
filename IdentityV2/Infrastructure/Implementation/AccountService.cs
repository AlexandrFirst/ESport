using AutoMapper;
using IdentityV2.Data;
using IdentityV2.Data.Domain;
using IdentityV2.Data.Utils;
using IdentityV2.Dto.User;
using IdentityV2.Infrastructure.Implementation;
using IdentityV2.Models;
using IdentityV2.Models.AccountModels;
using IdentityV2.RMQ;
using IdentityV2.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityV2.Infrastructure.Core
{
    public class AccountService : IAccountService
    {
        private readonly IdentityDataContext dataContext;
        private readonly IJWTManagerRepository jwtMananager;
        private readonly IMapper mapper;
        private readonly IMessageProducer messageProducer;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly string passwordSecretKey;

        public AccountService(IdentityDataContext dataContext,
            IJWTManagerRepository jwtMananager,
            IConfiguration configuration,
            IMapper mapper,
            IMessageProducer messageProducer,
            IHttpContextAccessor httpContextAccessor)
        {
            this.dataContext = dataContext;
            this.jwtMananager = jwtMananager;
            this.mapper = mapper;
            this.messageProducer = messageProducer;
            this.httpContextAccessor = httpContextAccessor;
            passwordSecretKey = configuration.GetSection("User")["Key"];

        }

        public async Task<bool> ConfirmRegistration(string token)
        {
            var pendingUser = await dataContext.PendingUser.FirstOrDefaultAsync(x => x.PendingToken.Equals(Guid.Parse(token)));
            if (pendingUser == null)
                return false;

            if (DateTime.Now > pendingUser.PendingDateEnd)
            {
                dataContext.Remove(pendingUser);
                return false;
            }

            var user = pendingUser.User;
            user.IsPending = false;
            dataContext.Remove(pendingUser);
            await dataContext.SaveChangesAsync();

            return true;
        }

        public async Task<Tokens> Login(UserLoginDto userLoginDto)
        {
            var token = await jwtMananager.AuthenticateAsync(userLoginDto);
            return token;
        }

        public async Task<RegisterResultModel> Register(RegisterModel registerModel)
        {
            PasswordHelper passwordHelper = new PasswordHelper(passwordSecretKey);
            var basicRole = dataContext.Roles.FirstOrDefault(x => x.Title == "LocalAdmin");
            if (basicRole == null) { throw new System.Exception("Unable to find proper role"); }


            var creatUserDto = new CreateUserDto()
            {
                Email = registerModel.Email,
                Name = registerModel.Name,
                Password = registerModel.Password,
                ConfirmPassword = registerModel.ConfirmPassword,
                Surname = registerModel.Surname,
                TelephoneNumber = registerModel.TelephoneNumber,
            };

            ICollection<ValidationResult> validationResults = null;
            var isModelValid = ModelUtils.Validate(creatUserDto, out validationResults);
            if (isModelValid)
            {

                var userToInsert = mapper.Map<User>(creatUserDto);
                userToInsert.IsPending = true;
                userToInsert.PendingUser = new PendingUser()
                {
                    PendingToken = System.Guid.NewGuid(),
                    PendingDateEnd = DateTime.Now.AddHours(4)
                };
                userToInsert.HashedPassword = passwordHelper.Hash(creatUserDto.Password);
                userToInsert.UserRoles.Add(new UserRoles() { Role = basicRole });

                dataContext.Users.Add(userToInsert);

                messageProducer.SendMessage(new
                {
                    token = userToInsert.PendingUser.PendingToken.ToString(),
                    mail = userToInsert.Email,
                    template = "<p>Click to confirm your account <a href='http://localhost:3000/user/confirm/{0}'>Confirm</a></p>"
                });
                await dataContext.SaveChangesAsync();

                return new RegisterResultModel { IsSuccess = true };
            }
            else
            {
                var errors = validationResults.Select(o => o.ErrorMessage).ToList();
                return new RegisterResultModel { IsSuccess = false, Error = errors };
            }
        }
    }
}
