using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;
using UserWorkflow.Esport.Extensions;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Esport.Configuration
{
    public class TrainerSheduleConfiguration : IEntityTypeConfiguration<TrainerShedule>
    {
        public void Configure(EntityTypeBuilder<TrainerShedule> builder)
        {
            builder.HasOne(x => x.GymShift)
                .WithMany(x => x.TrainerShedules)
                .HasForeignKey(x => x.ShiftId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.Trainer)
                .WithMany(x => x.TraineeShedules)
                .HasForeignKey(x => x.TrainerId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Property(x => x.TimeOverride).HasJsonConversion<List<TimeOverride>>();
        }
    }
}
