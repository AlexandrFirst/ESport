using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Esport.Configuration
{
    public class ExerciseSportConfiguration : IEntityTypeConfiguration<ExerciseSport>
    {
        public void Configure(EntityTypeBuilder<ExerciseSport> builder)
        {
            builder.HasOne(x => x.Exercise)
                .WithMany(x => x.ExerciseSports)
                .HasForeignKey(x => x.ExerciseId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.Sport)
                .WithMany(x => x.ExerciseSports)
                .HasForeignKey(x => x.SportId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
