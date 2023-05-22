using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Esport.Configuration
{
    public class TrainerConfiguration : IEntityTypeConfiguration<Trainer>
    {
        public void Configure(EntityTypeBuilder<Trainer> builder)
        {
            builder.HasKey(x => x.Id);
            //builder.HasIndex(x => x.Email).IsUnique();

            builder.HasMany(x => x.Exercise)
                .WithOne(x => x.ExerciseOwner)
                .HasForeignKey(x => x.ExerciseOwnerId)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
