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
    public class SportConfiguration : IEntityTypeConfiguration<Sport>
    {
        public void Configure(EntityTypeBuilder<Sport> builder)
        {
            builder.HasData(new Sport()
            {
                Name = "Swimming",
                Type = SportType.Strength,
                Description = "Suitable for everyone"
            },
            new Sport()
            {
                Name = "Karate",
                Type = SportType.Fighting,
                Description = "Suitable for everyone"
            },
            new Sport()
            {
                Name = "Powerlifting",
                Type = SportType.Strength,
                Description = "Suitable for everyone"
            },
            new Sport()
            {
                Name = "Car racing",
                Type = SportType.Endurance,
                Description = "Suitable for everyone"
            },
             new Sport()
             {
                 Name = "Football",
                 Type = SportType.Endurance,
                 Description = "Suitable for everyone"
             },
               new Sport()
               {
                   Name = "Basketball",
                   Type = SportType.Endurance,
                   Description = "Suitable for everyone"
               });
        }
    }
}
