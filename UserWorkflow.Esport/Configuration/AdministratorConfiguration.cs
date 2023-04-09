using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Esport.Configuration
{
    public class AdministratorConfiguration : IEntityTypeConfiguration<Administrators>
    {
        public void Configure(EntityTypeBuilder<Administrators> builder)
        {
            builder.HasIndex(x => new { x.UserId }).IsUnique();
            builder.HasIndex(x => x.Email).IsUnique();
        }
    }
}
