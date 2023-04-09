using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Esport.Configuration
{
    public class LessonConfiguration : IEntityTypeConfiguration<Lesson>
    {
        public void Configure(EntityTypeBuilder<Lesson> builder)
        {
            builder.HasOne(x => x.TrainerShedule)
                .WithMany(x => x.Lessons)
                .HasForeignKey(x => x.TrainerSheduleId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
