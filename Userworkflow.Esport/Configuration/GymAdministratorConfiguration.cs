using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Esport.Configuration
{
    internal class GymAdministratorConfiguration : IEntityTypeConfiguration<GymAdministrators>
    {
        public void Configure(EntityTypeBuilder<GymAdministrators> builder)
        {
            builder.HasOne(x => x.Administrators)
                .WithMany(x => x.GymAdministrators)
                .HasForeignKey(x => x.AdministratorId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.Gym)
                .WithMany(x => x.GymAdministrators)
                .HasForeignKey(x => x.GymId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
