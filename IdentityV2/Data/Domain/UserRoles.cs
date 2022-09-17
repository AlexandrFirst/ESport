namespace IdentityV2.Data.Domain
{
    public class UserRoles
    {
        public int Id { get; set; }
        public Role Roles { get; set; }
        public User User { get; set; }
    }
}
