using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Esport.Configuration
{
    public class AnswerBodyPartConfiguration : IEntityTypeConfiguration<AnswerBodyParts>
    {
        public void Configure(EntityTypeBuilder<AnswerBodyParts> builder)
        {
            builder.HasOne(x => x.Answers)
                .WithMany(x => x.AnswerBodyParts)
                .HasForeignKey(x => x.AnswerId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.BodyParts)
               .WithMany(x => x.AnswerBodyParts)
               .HasForeignKey(x => x.BodyPartId)
               .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
