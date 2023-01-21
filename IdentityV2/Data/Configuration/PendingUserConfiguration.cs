using IdentityV2.Data.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace IdentityV2.Data.Configuration
{
    public class PendingUserConfiguration : IEntityTypeConfiguration<PendingUser>
    {
        public void Configure(EntityTypeBuilder<PendingUser> builder)
        {
            builder.HasKey(x => x.PendingToken);
            builder.HasOne(x => x.UserAvatar)
                .WithOne(u => u.PendingUser)
                .HasForeignKey<PendingUser>(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
