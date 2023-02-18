using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Esport.Configuration
{
    public class GymShiftConfiguration : IEntityTypeConfiguration<GymShift>
    {
        public void Configure(EntityTypeBuilder<GymShift> builder)
        {
            builder.HasOne(x => x.Gym)
                .WithMany(x => x.GymShifts)
                .HasForeignKey(x => x.GymId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
