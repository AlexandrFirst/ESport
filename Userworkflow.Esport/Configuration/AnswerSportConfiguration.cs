using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Esport.Configuration
{
    public class AnswerSportConfiguration : IEntityTypeConfiguration<AnswerSport>
    {
        public void Configure(EntityTypeBuilder<AnswerSport> builder)
        {
            builder.HasOne(x => x.Answers)
                .WithMany(x => x.AnswerSports)
                .HasForeignKey(x => x.AnswerId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.Sport)
                .WithMany(x => x.AnswerSports)
                .HasForeignKey(x => x.SportId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
