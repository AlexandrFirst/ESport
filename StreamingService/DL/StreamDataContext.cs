using Microsoft.EntityFrameworkCore;
using StreamingService.DL.Configurations;
using StreamingService.DL.Models;
using System.Diagnostics.CodeAnalysis;

namespace StreamingService.DL
{
    public class StreamDataContext : DbContext
    {
        public virtual DbSet<EsStream> EsStreams { get; set; }
        public virtual DbSet<EsStreamRecords> EsStreamRecords { get; set; }
        public virtual DbSet<StreamPreviewImage> StreamPreviewImages { get; set; }
        public virtual DbSet<UserStreamRecordAccessRules> UserStreamRecordAccessRules { get; set; }

        public StreamDataContext([NotNull] DbContextOptions options) : base(options)
        {
            Database.Migrate();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new EsStreamConfiguration());
            modelBuilder.ApplyConfiguration(new EsStreamRecordConfiguration());
            modelBuilder.ApplyConfiguration(new UserStreamRecordAccessRulesConfiguration());
        }
    }
}
