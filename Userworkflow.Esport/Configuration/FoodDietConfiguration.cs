using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Esport.Configuration
{
    public class FoodDietConfiguration : IEntityTypeConfiguration<FoodDiet>
    {
        public void Configure(EntityTypeBuilder<FoodDiet> builder)
        {
            builder.HasOne(x => x.Trainer)
                .WithMany(x => x.FoodDiets)
                .HasForeignKey(x => x.TrainerId)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
