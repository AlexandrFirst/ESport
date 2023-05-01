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
    public class TrainerResponseConfiguration : IEntityTypeConfiguration<TrainerResponse>
    {
        public void Configure(EntityTypeBuilder<TrainerResponse> builder)
        {
            builder.HasOne(x => x.TrainerRequest)
                .WithMany(x => x.TrainerResponses)
                .HasForeignKey(x => x.TrainerRequestId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.Trainer)
                .WithMany(x => x.TrainerResponses)
                .HasForeignKey(x => x.TrainerId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
