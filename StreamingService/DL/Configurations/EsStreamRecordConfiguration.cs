using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StreamingService.DL.Models;

namespace StreamingService.DL.Configurations
{
    public class EsStreamRecordConfiguration : IEntityTypeConfiguration<EsStreamRecords>
    {
        public void Configure(EntityTypeBuilder<EsStreamRecords> builder)
        {
            builder.HasOne(e => e.Stream).WithMany(e => e.StreamRecords)
                .HasForeignKey(e => e.EsStreamId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
