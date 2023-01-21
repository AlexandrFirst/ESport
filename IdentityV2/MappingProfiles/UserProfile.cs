using AutoMapper;
using IdentityV2.Data.Domain;
using IdentityV2.Dto.User;

namespace IdentityV2.MappingProfiles
{
    public class UserProfile: Profile
    {
        public UserProfile()
        {
            CreateMap<CreateUserDto, User>().ForSourceMember(x => x.Password, opt => opt.DoNotValidate());
        }
    }
}
