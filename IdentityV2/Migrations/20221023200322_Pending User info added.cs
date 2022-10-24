using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IdentityV2.Migrations
{
    public partial class PendingUserinfoadded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsPending",
                table: "Users",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "PendingUser",
                columns: table => new
                {
                    PendingToken = table.Column<Guid>(nullable: false),
                    UserId = table.Column<int>(nullable: false),
                    PendingDateEnd = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PendingUser", x => x.PendingToken);
                    table.ForeignKey(
                        name: "FK_PendingUser_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PendingUser_UserId",
                table: "PendingUser",
                column: "UserId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PendingUser");

            migrationBuilder.DropColumn(
                name: "IsPending",
                table: "Users");
        }
    }
}
