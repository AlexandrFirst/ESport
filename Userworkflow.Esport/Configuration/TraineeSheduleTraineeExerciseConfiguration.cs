using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Esport.Configuration
{
    public class TraineeSheduleTraineeExerciseConfiguration : IEntityTypeConfiguration<TraineeSheduleTraineeExercise>
    {
        public void Configure(EntityTypeBuilder<TraineeSheduleTraineeExercise> builder)
        {
            builder.HasOne(x => x.TraineeShedule)
                .WithMany(x => x.TraineeSheduleExercises)
                .HasForeignKey(x => x.TraineeSheduleId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.TraineeExercise)
                .WithMany(x => x.TraineeSheduleExercises)
                .HasForeignKey(x => x.TraineeExerciseId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
