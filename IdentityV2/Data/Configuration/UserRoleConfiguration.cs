using IdentityV2.Data.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace IdentityV2.Data.Configuration
{
    public class UserRoleConfiguration : IEntityTypeConfiguration<UserRoles>
    {
        public void Configure(EntityTypeBuilder<UserRoles> builder)
        {
            builder.HasOne(ur => ur.Role).WithMany(r => r.UserRole).OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(ur => ur.UserAvatar).WithMany(r => r.UserRoles).OnDelete(DeleteBehavior.Restrict);
        }
    }
}
