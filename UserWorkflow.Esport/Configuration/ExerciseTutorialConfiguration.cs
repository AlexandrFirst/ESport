using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Esport.Configuration
{
    public class ExerciseTutorialConfiguration : IEntityTypeConfiguration<ExerciseTutorial>
    {
        public void Configure(EntityTypeBuilder<ExerciseTutorial> builder)
        {
            builder.HasOne(x => x.Exercise)
                .WithMany(x => x.ExerciseTutorails)
                .HasForeignKey(x => x.ExerciseId)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
