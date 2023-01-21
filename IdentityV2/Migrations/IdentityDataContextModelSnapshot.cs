﻿// <auto-generated />
using System;
using IdentityV2.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace IdentityV2.Migrations
{
    [DbContext(typeof(IdentityDataContext))]
    partial class IdentityDataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.29")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("IdentityV2.Data.Domain.PendingUser", b =>
                {
                    b.Property<Guid>("PendingToken")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("PendingDateEnd")
                        .HasColumnType("datetime2");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("PendingToken");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("PendingUser");
                });

            modelBuilder.Entity("IdentityV2.Data.Domain.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Roles");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Title = "OrgAdmin"
                        },
                        new
                        {
                            Id = 2,
                            Title = "LocalAdmin"
                        },
                        new
                        {
                            Id = 3,
                            Title = "Teacher"
                        },
                        new
                        {
                            Id = 4,
                            Title = "Pupil"
                        });
                });

            modelBuilder.Entity("IdentityV2.Data.Domain.UserAvatar", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("HashedPassword")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsPending")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ProfileImageUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Surname")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TelephoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("IdentityV2.Data.Domain.UserHistory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Url")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.Property<DateTime>("VisitTime")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("UserHistory");
                });

            modelBuilder.Entity("IdentityV2.Data.Domain.UserRoles", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.HasIndex("UserId");

                    b.ToTable("UserRoles");
                });

            modelBuilder.Entity("IdentityV2.Data.Domain.PendingUser", b =>
                {
                    b.HasOne("IdentityV2.Data.Domain.UserAvatar", "UserAvatar")
                        .WithOne("PendingUser")
                        .HasForeignKey("IdentityV2.Data.Domain.PendingUser", "UserId")
                        .OnDelete(DeleteBehavior.SetNull)
                        .IsRequired();
                });

            modelBuilder.Entity("IdentityV2.Data.Domain.UserHistory", b =>
                {
                    b.HasOne("IdentityV2.Data.Domain.UserAvatar", "UserAvatar")
                        .WithMany("UserHistory")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IdentityV2.Data.Domain.UserRoles", b =>
                {
                    b.HasOne("IdentityV2.Data.Domain.Role", "Role")
                        .WithMany("UserRole")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("IdentityV2.Data.Domain.UserAvatar", "UserAvatar")
                        .WithMany("UserRoles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
