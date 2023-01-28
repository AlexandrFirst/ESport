using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace StreamingService.Migrations
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "StreamPreviewImages",
                columns: table => new
                {
                    ImageId = table.Column<Guid>(nullable: false),
                    ImageLink = table.Column<string>(nullable: true),
                    PublicId = table.Column<string>(nullable: true),
                    Metadata = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StreamPreviewImages", x => x.ImageId);
                });

            migrationBuilder.CreateTable(
                name: "EsStreams",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    OrganiserId = table.Column<int>(nullable: false),
                    EventId = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    ConnectionId = table.Column<string>(nullable: true),
                    StartTime = table.Column<DateTime>(nullable: true),
                    EndTime = table.Column<DateTime>(nullable: true),
                    PreviewImageId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EsStreams", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EsStreams_StreamPreviewImages_PreviewImageId",
                        column: x => x.PreviewImageId,
                        principalTable: "StreamPreviewImages",
                        principalColumn: "ImageId",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "EsStreamRecords",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    ByteSize = table.Column<int>(nullable: false),
                    AccessMode = table.Column<int>(nullable: false),
                    EsStreamId = table.Column<Guid>(nullable: false),
                    CreationDate = table.Column<DateTime>(nullable: false),
                    RecordStatus = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EsStreamRecords", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EsStreamRecords_EsStreams_EsStreamId",
                        column: x => x.EsStreamId,
                        principalTable: "EsStreams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserStreamRecordAccessRules",
                columns: table => new
                {
                    RuleId = table.Column<Guid>(nullable: false),
                    UserId = table.Column<int>(nullable: false),
                    EsStreamRecordId = table.Column<Guid>(nullable: false),
                    AccessType = table.Column<int>(nullable: false),
                    IsAdmin = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserStreamRecordAccessRules", x => x.RuleId);
                    table.ForeignKey(
                        name: "FK_UserStreamRecordAccessRules_EsStreamRecords_RuleId",
                        column: x => x.RuleId,
                        principalTable: "EsStreamRecords",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EsStreamRecords_EsStreamId",
                table: "EsStreamRecords",
                column: "EsStreamId");

            migrationBuilder.CreateIndex(
                name: "IX_EsStreams_PreviewImageId",
                table: "EsStreams",
                column: "PreviewImageId",
                unique: true,
                filter: "[PreviewImageId] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserStreamRecordAccessRules");

            migrationBuilder.DropTable(
                name: "EsStreamRecords");

            migrationBuilder.DropTable(
                name: "EsStreams");

            migrationBuilder.DropTable(
                name: "StreamPreviewImages");
        }
    }
}
