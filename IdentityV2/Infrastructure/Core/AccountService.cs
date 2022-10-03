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
using Microsoft.Extensions.Configuration;
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
        private readonly string passwordSecretKey;

        public AccountService(IdentityDataContext dataContext, 
            IJWTManagerRepository jwtMananager,
            IConfiguration configuration,
            IMapper mapper,
            IMessageProducer messageProducer)
        {
            this.dataContext = dataContext;
            this.jwtMananager = jwtMananager;
            this.mapper = mapper;
            this.messageProducer = messageProducer;
            passwordSecretKey = configuration.GetSection("User")["Key"];

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
                TelephoneNumber = registerModel.TelephoneNumber
            };

            ICollection<ValidationResult> validationResults = null;
            var isModelValid = ModelUtils.Validate(creatUserDto, out validationResults);
            if (isModelValid)
            {

                var userToInsert = mapper.Map<User>(creatUserDto);
                userToInsert.HashedPassword = passwordHelper.Hash(creatUserDto.Password);
                userToInsert.UserRoles.Add(new UserRoles() { Role = basicRole });

                dataContext.Users.Add(userToInsert);

                await dataContext.SaveChangesAsync();

                messageProducer.SendMessage(new { token = "abcdefgh" });

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
