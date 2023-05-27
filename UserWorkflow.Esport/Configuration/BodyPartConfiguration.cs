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
    public class BodyPartConfiguration : IEntityTypeConfiguration<BodyParts>
    {
        public void Configure(EntityTypeBuilder<BodyParts> builder)
        {
            builder.HasData(new BodyParts[]
            {
                new BodyParts(){Id = 1, Name = "Shoulder", Description = "Some shoulder description" },
                new BodyParts(){Id = 2, Name = "Neck", Description = "Some neck description" },
                new BodyParts(){Id = 3, Name = "Backbone", Description = "Some backbone description" },
                new BodyParts(){Id = 4, Name = "Lumbar", Description = "Some lumbar description" },
                new BodyParts(){Id = 5, Name = "Arm", Description = "Some arm description"},
                new BodyParts(){Id = 6, Name = "Forearm", Description = "Some arm description"},
                new BodyParts(){Id = 7, Name = "Elbow", Description = "Some elbow description"},
                new BodyParts(){Id = 8, Name = "Wrist", Description = "Some wrist description"},
                new BodyParts(){Id = 9, Name = "Leg", Description = "Some leg description"},
                new BodyParts(){Id = 10,Name = "Foot",Description = "Some foot description"},
                new BodyParts(){Id = 11,Name = "Ankle",Description = "Some ankle description"},
                new BodyParts(){Id = 12,Name = "Nose",Description = "Some nose description"},
                 new BodyParts(){Id = 13,Name = "tendon ",Description = "Some tendon description"}
            });
        }
    }
}
