using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Esport.Configuration
{
    public class OrganisationAdministratorConfiguration : IEntityTypeConfiguration<OrganisationAdministrators>
    {
        public void Configure(EntityTypeBuilder<OrganisationAdministrators> builder)
        {
            builder.HasOne(x => x.Organisation)
                .WithMany(x => x.OrganisationAdministrators)
                .HasForeignKey(x => x.OrganisationId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
