using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Esport.Configuration
{
    public class LessonFoodDietConfiguration : IEntityTypeConfiguration<Lesson_FoodDiet>
    {
        public void Configure(EntityTypeBuilder<Lesson_FoodDiet> builder)
        {
            builder.HasOne(x => x.Lesson)
                .WithMany(x => x.LessonFoodDiets)
                .HasForeignKey(x => x.LessonId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.FoodDiet)
                .WithMany(x => x.LessonFoodDiets)
                .HasForeignKey(x => x.FoodDietId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
