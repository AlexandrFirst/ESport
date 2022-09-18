using System.ComponentModel.DataAnnotations.Schema;

namespace IdentityV2.Data.Domain
{
    public class UserRoles
    {
        public int Id { get; set; }

        [ForeignKey(nameof(Role))]
        public int RoleId { get; set; }
        public Role Role { get; set; }

        [ForeignKey(nameof(User))]
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
