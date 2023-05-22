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
    public class TraumaConfiguration : IEntityTypeConfiguration<Traumas>
    {
        public void Configure(EntityTypeBuilder<Traumas> builder)
        {
            builder.HasOne(x => x.BodyParts).WithMany(x => x.RelatedTraumas).HasForeignKey(x => x.BodyPartId).OnDelete(DeleteBehavior.SetNull);

            builder.HasData(new Traumas()
            {
                Id = 1,
                Name = "ankle fracture",
                Description = "very painful trauma",
                HealDescription = "Drink tea",
                BodyPartId = 11,
            },
            new Traumas()
            {
                Id = 2,
                Name = "pain in the lumbar",
                Description = "very painful trauma",
                HealDescription = "Drink tea",
                BodyPartId = 4,
            },
            new Traumas()
            {
                Id = 3,
                Name = "Blood from nose",
                Description = "very painful trauma",
                HealDescription = "Drink tea",
                BodyPartId = 12,
            },
            new Traumas()
            {
                Id = 4,
                Name = "Fracture of the lumbar spine",
                Description = "very painful trauma",
                HealDescription = "Drink tea",
                BodyPartId = 4,
            },
            new Traumas()
            {
                Id = 5,
                Name = "Achilles tendon sprain or tear",
                Description = "very painful trauma",
                HealDescription = "Drink tea",
                BodyPartId = 13,
            },
            new Traumas()
            {
                Id = 6,
                Name = "Ankle sprains",
                Description = "very painful trauma",
                HealDescription = "Drink tea",
                BodyPartId = 11,
            },
            new Traumas()
            {
                Id = 7,
                Name = "Pain in the wrist",
                Description = "very painful trauma",
                HealDescription = "Drink tea",
                BodyPartId = 8,
            });
        }
    }
}
