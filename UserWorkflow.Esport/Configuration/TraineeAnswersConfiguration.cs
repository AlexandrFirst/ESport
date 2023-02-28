using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Esport.Configuration
{
    public class TraineeAnswersConfiguration : IEntityTypeConfiguration<TraineeAnswers>
    {
        public void Configure(EntityTypeBuilder<TraineeAnswers> builder)
        {
            builder.HasOne(x => x.Trainee)
                .WithMany(x => x.TraineeAnswers)
                .HasForeignKey(x => x.TraineeId)
                .OnDelete(DeleteBehavior.Cascade);
            builder.HasOne(x => x.Answers)
                .WithMany(x => x.TraineeAnswers)
                .HasForeignKey(x => x.AnswerId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
