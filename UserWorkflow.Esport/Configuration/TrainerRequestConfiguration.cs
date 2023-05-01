using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Esport.Configuration
{
    public class TrainerRequestConfiguration : IEntityTypeConfiguration<TrainerRequest>
    {
        public void Configure(EntityTypeBuilder<TrainerRequest> builder)
        {
            builder.HasOne(x => x.TrainerShedule)
                 .WithMany(x => x.TrainerRequests)
                 .HasForeignKey(x => x.TrainerSheduleId)
                 .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
