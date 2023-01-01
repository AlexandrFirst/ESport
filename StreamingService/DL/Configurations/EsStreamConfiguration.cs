using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StreamingService.DL.Models;

namespace StreamingService.DL.Configurations
{
    public class EsStreamConfiguration : IEntityTypeConfiguration<EsStream>
    {
        public void Configure(EntityTypeBuilder<EsStream> builder)
        {
            builder.HasOne(e => e.PreviewImage)
                .WithOne(e => e.EsStream)
                .HasForeignKey<EsStream>(k => k.PreviewImageId)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
