using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Esport.Configuration
{
    public class Food_FoodDietConfiguration : IEntityTypeConfiguration<Food_FoodDiet>
    {
        public void Configure(EntityTypeBuilder<Food_FoodDiet> builder)
        {
            builder.HasOne(x => x.FoodDiet)
                .WithMany(x => x.Food_FoodDiets)
                .HasForeignKey(x => x.DietId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.Food)
                .WithMany(x => x.FoodDiets)
                .HasForeignKey(x => x.FoodId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
