using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Text;
using UserWorkflow.Images.Models;

namespace UserWorkflow.Images
{
    public class ImagesDataContext: DbContext
    {
        public virtual DbSet<DomainImage> DomainImages { get; set; }
        public virtual DbSet<ExerciseImage> ExerciseImages { get; set; }
        public virtual DbSet<FoodImage> FoodImages { get; set; }
        public virtual DbSet<UserImage> UserImages { get; set; }

        public ImagesDataContext([NotNull] DbContextOptions<ImagesDataContext> options) : base(options)
        {
            Database.Migrate();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }
    }
}
