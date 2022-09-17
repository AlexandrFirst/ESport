using System.Collections.Generic;

namespace IdentityV2.Data.Domain
{
    public class User
    {
        public User()
        {
            UserRoles = new List<UserRoles>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string TelephoneNumber { get; set; }
        public string HashedPassword { get; set; }
        public string Salt { get; set; }
        public string ProfileImageUrl { get; set; }
        public List<UserRoles> UserRoles { get; set; }
        public List<UserHistory> UserHistory { get; set; }

    }
}
