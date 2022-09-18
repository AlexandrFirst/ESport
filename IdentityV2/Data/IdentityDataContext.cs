using IdentityV2.Data.Configuration;
using IdentityV2.Data.Domain;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace IdentityV2.Data
{
    public class IdentityDataContext : DbContext
    {
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UserHistory> UserHistory { get; set; }
        public virtual DbSet<UserRoles> UserRoles { get; set; }
        public IdentityDataContext([NotNull] DbContextOptions options) : base(options)
        {
            Database.Migrate();
            this.ChangeTracker.LazyLoadingEnabled = false;
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new UserRoleConfiguration());
            modelBuilder.ApplyConfiguration(new RoleConfiguration());
        }
    }
}
