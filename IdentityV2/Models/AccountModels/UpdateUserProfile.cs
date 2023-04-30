using System.Collections.Generic;

namespace IdentityV2.Models.AccountModels
{
    public class UpdateUserProfile
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string TelephoneNumber { get; set; }

        public List<int> RolesToAdd { get; set; }
        public List<int> RolesToRemove { get; set; }
    }
}
