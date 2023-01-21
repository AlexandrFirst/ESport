using AutoMapper;
using IdentityV2.Data.Domain;
using IdentityV2.Dto.UserAvatar;

namespace IdentityV2.MappingProfiles
{
    public class UserProfile: Profile
    {
        public UserProfile()
        {
            CreateMap<CreateUserDto, UserAvatar>().ForSourceMember(x => x.Password, opt => opt.DoNotValidate());
        }
    }
}
