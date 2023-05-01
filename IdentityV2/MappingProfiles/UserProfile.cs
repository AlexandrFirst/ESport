using AutoMapper;
using IdentityV2.Data.Domain;
using IdentityV2.Dto.User;
using IdentityV2.Models.AccountModels;

namespace IdentityV2.MappingProfiles
{
    public class UserProfile: Profile
    {
        public UserProfile()
        {
            CreateMap<CreateUserDto, User>().ForSourceMember(x => x.Password, opt => opt.DoNotValidate());
            CreateMap<UpdateUserProfile, User>(MemberList.None)
                .ForMember(x => x.Name, opt => opt.Condition(src => !string.IsNullOrEmpty(src.Name)))
                .ForMember(x => x.Surname, opt => opt.Condition(src => !string.IsNullOrEmpty(src.Surname)))
                .ForMember(x => x.TelephoneNumber, opt => opt.Condition(src => !string.IsNullOrEmpty(src.TelephoneNumber)))
                .ForMember(x => x.Email, opt => opt.Condition(src => !string.IsNullOrEmpty(src.Email)));
        }
    }
}
