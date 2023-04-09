using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Esport.Configuration
{
    public class AnswerTraumaConfiguration : IEntityTypeConfiguration<AnswerTraumas>
    {
        public void Configure(EntityTypeBuilder<AnswerTraumas> builder)
        {
            builder.HasOne(x => x.Answers)
                .WithMany(x => x.AnswerTraumas)
                .HasForeignKey(x => x.AnswerId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.Traumas)
                .WithMany(x => x.AnswerTraumas)
                .HasForeignKey(x => x.TraumaId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
