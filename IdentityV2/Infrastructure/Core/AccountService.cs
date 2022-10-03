using AutoMapper;
using IdentityV2.Data;
using IdentityV2.Data.Domain;
using IdentityV2.Data.Utils;
using IdentityV2.Dto.User;
using IdentityV2.Infrastructure.Implementation;
using IdentityV2.Models;
using IdentityV2.Models.AccountModels;
using Microsoft.Extensions.Configuration;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityV2.Infrastructure.Core
{
    public class AccountService : IAccountService
    {
        private readonly IdentityDataContext dataContext;
        private readonly IJWTManagerRepository jwtMananager;
        private readonly IConfiguration configuration;
        private readonly IMapper mapper;
        private readonly string passwordSecretKey;

        public AccountService(IdentityDataContext dataContext, 
            IJWTManagerRepository jwtMananager,
            IConfiguration configuration,
            IMapper mapper)
        {
            this.dataContext = dataContext;
            this.jwtMananager = jwtMananager;
            this.configuration = configuration;
            this.mapper = mapper;
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
                Surname = registerModel.Surname,
                TelephoneNumber = registerModel.TelephoneNumber
            };
            var userToInsert = mapper.Map<User>(creatUserDto);
            userToInsert.HashedPassword = passwordHelper.Hash(creatUserDto.Password);
            userToInsert.UserRoles.Add(new UserRoles() { Role = basicRole });

            dataContext.Users.Add(userToInsert);

            await dataContext.SaveChangesAsync();

            return new RegisterResultModel { IsSuccess = true };

        }
    }
}
