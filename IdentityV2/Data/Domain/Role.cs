using System.Collections.Generic;

namespace IdentityV2.Data.Domain
{
    public class Role
    {
        public Role()
        {
            UserRole = new List<UserRoles>();
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public List<UserRoles> UserRole { get; set; }
    }
}
