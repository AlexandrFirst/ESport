using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StreamingService.DL.Models;

namespace StreamingService.DL.Configurations
{
    public class UserStreamRecordAccessRulesConfiguration : IEntityTypeConfiguration<UserStreamRecordAccessRules>
    {
        public void Configure(EntityTypeBuilder<UserStreamRecordAccessRules> builder)
        {
            builder.HasOne(x => x.EsStreamRecord)
                .WithMany(p => p.LinkedUsers)
                .HasForeignKey(x => x.RuleId)
                .OnDelete(DeleteBehavior.Cascade);   
        }
    }
}
