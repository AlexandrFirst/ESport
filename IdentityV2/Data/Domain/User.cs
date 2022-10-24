using System;
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
        public string ProfileImageUrl { get; set; }
        public bool IsPending { get; set; }
        public virtual PendingUser PendingUser { get; set; }
        public virtual List<UserRoles> UserRoles { get; set; }
        public virtual List<UserHistory> UserHistory { get; set; }

    }
}
