﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using StreamingService.DL;

namespace StreamingService.Migrations
{
    [DbContext(typeof(StreamDataContext))]
    partial class StreamDataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.32")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("StreamingService.DL.Models.EsStream", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("ConnectionId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("EndTime")
                        .HasColumnType("datetime2");

                    b.Property<int>("EventId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("OrganiserId")
                        .HasColumnType("int");

                    b.Property<Guid?>("PreviewImageId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("StartTime")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("PreviewImageId")
                        .IsUnique()
                        .HasFilter("[PreviewImageId] IS NOT NULL");

                    b.ToTable("EsStreams");
                });

            modelBuilder.Entity("StreamingService.DL.Models.EsStreamRecords", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("AccessMode")
                        .HasColumnType("int");

                    b.Property<int>("ByteSize")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("EsStreamId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RecordStatus")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("EsStreamId");

                    b.ToTable("EsStreamRecords");
                });

            modelBuilder.Entity("StreamingService.DL.Models.StreamPreviewImage", b =>
                {
                    b.Property<Guid>("ImageId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("ImageLink")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Metadata")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PublicId")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ImageId");

                    b.ToTable("StreamPreviewImages");
                });

            modelBuilder.Entity("StreamingService.DL.Models.UserStreamRecordAccessRules", b =>
                {
                    b.Property<Guid>("RuleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("AccessType")
                        .HasColumnType("int");

                    b.Property<Guid>("EsStreamRecordId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("IsAdmin")
                        .HasColumnType("bit");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("RuleId");

                    b.ToTable("UserStreamRecordAccessRules");
                });

            modelBuilder.Entity("StreamingService.DL.Models.EsStream", b =>
                {
                    b.HasOne("StreamingService.DL.Models.StreamPreviewImage", "PreviewImage")
                        .WithOne("EsStream")
                        .HasForeignKey("StreamingService.DL.Models.EsStream", "PreviewImageId")
                        .OnDelete(DeleteBehavior.SetNull);
                });

            modelBuilder.Entity("StreamingService.DL.Models.EsStreamRecords", b =>
                {
                    b.HasOne("StreamingService.DL.Models.EsStream", "Stream")
                        .WithMany("StreamRecords")
                        .HasForeignKey("EsStreamId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("StreamingService.DL.Models.UserStreamRecordAccessRules", b =>
                {
                    b.HasOne("StreamingService.DL.Models.EsStreamRecords", "EsStreamRecord")
                        .WithMany("LinkedUsers")
                        .HasForeignKey("RuleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
