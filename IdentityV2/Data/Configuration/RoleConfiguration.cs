using IdentityV2.Data.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace IdentityV2.Data.Configuration
{
    public class RoleConfiguration : IEntityTypeConfiguration<Role>
    {
        public void Configure(EntityTypeBuilder<Role> builder)
        {
            builder.HasData(new Role[] 
            {
                new Role(){ Id = 1, Title = "OrgAdmin"},
                new Role(){ Id = 2, Title = "LocalAdmin"},
                new Role(){ Id = 3, Title = "Trainer"},
                new Role(){ Id = 4, Title = "Trainee"},
            });
        }
    }
}
