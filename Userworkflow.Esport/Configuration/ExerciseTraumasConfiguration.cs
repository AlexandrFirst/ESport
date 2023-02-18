using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Esport.Configuration
{
    public class ExerciseTraumasConfiguration : IEntityTypeConfiguration<ExerciseTraumas>
    {
        public void Configure(EntityTypeBuilder<ExerciseTraumas> builder)
        {
            builder.HasOne(x => x.Exercise)
                .WithMany(x => x.ExerciseTraumas)
                .HasForeignKey(x => x.ExerciseId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.Traumas)
                .WithMany(x => x.ExerciseTraumas)
                .HasForeignKey(x => x.TraumaId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
