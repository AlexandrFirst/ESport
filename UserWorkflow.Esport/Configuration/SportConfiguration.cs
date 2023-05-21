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
                Id = 1,
                Name = "Swimming",
                Type = SportType.Strength,
                Description = "Suitable for everyone"
            },
            new Sport()
            {
                Id = 2,
                Name = "Karate",
                Type = SportType.Fighting,
                Description = "Suitable for everyone"
            },
            new Sport()
            {
                Id = 3,
                Name = "Powerlifting",
                Type = SportType.Strength,
                Description = "Suitable for everyone"
            },
            new Sport()
            {
                Id = 4,
                Name = "Car racing",
                Type = SportType.Endurance,
                Description = "Suitable for everyone"
            },
            new Sport()
            {
                Id = 5,
                Name = "Football",
                Type = SportType.Endurance,
                Description = "Suitable for everyone"
            },
            new Sport()
            {
                Id = 6,
                Name = "Basketball",
                Type = SportType.Endurance,
                Description = "Suitable for everyone"
            });
        }
    }
}
