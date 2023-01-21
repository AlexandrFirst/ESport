using IdentityV2.Data.Domain;
using System.Collections.Generic;

namespace IdentityV2.Dto.User
{
    public class UserValidateNavigation
    {
        public string Url { get; set; }
        public List<Role> Role { get; set; }
    }
}
