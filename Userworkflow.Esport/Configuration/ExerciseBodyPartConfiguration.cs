using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Esport.Configuration
{
    public class ExerciseBodyPartConfiguration : IEntityTypeConfiguration<ExerciseBodyPart>
    {
        public void Configure(EntityTypeBuilder<ExerciseBodyPart> builder)
        {
            builder.HasOne(x => x.Exercise)
                .WithMany(x => x.BodyParts)
                .HasForeignKey(x => x.ExerciseId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.BodyParts)
                .WithMany(x => x.ExerciseBodyParts)
                .HasForeignKey(x => x.BodyPartId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
