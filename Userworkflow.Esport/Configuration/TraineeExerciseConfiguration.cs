using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Esport.Configuration
{
    public class TraineeExerciseConfiguration : IEntityTypeConfiguration<TraineeExercise>
    {
        public void Configure(EntityTypeBuilder<TraineeExercise> builder)
        {
            builder.HasOne(x => x.Exercise)
                .WithMany(x => x.TraineeExercises)
                .HasForeignKey(x => x.ExerciseId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
