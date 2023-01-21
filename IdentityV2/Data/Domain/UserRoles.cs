using System.ComponentModel.DataAnnotations.Schema;

namespace IdentityV2.Data.Domain
{
    public class UserRoles
    {
        public int Id { get; set; }

        [ForeignKey(nameof(Role))]
        public int RoleId { get; set; }
        public virtual Role Role { get; set; }

        [ForeignKey(nameof(UserAvatar))]
        public int UserId { get; set; }
        public virtual UserAvatar UserAvatar { get; set; }
    }
}
