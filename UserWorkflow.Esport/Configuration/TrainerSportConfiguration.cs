using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Esport.Configuration
{
    public class TrainerSportConfiguration : IEntityTypeConfiguration<TrainerSport>
    {
        public void Configure(EntityTypeBuilder<TrainerSport> builder)
        {
            builder.HasOne(x => x.Trainer)
                .WithMany(x => x.TrainerSports)
                .HasForeignKey(x => x.TrainerId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.Sport)
                .WithMany(x => x.TrainerSports)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
