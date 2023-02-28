using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Esport.Configuration
{
    public class TraineeSheduleConfiguration : IEntityTypeConfiguration<TraineeShedule>
    {
        public void Configure(EntityTypeBuilder<TraineeShedule> builder)
        {
            builder.HasOne(x => x.Trainee)
                .WithMany(x => x.TraineeShedules)
                .HasForeignKey(x => x.TraineeId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.Lesson)
                .WithMany(x => x.TraineeShedules)
                .HasForeignKey(x => x.LessonId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
