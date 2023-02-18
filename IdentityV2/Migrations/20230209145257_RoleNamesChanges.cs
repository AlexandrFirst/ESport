using Microsoft.EntityFrameworkCore.Migrations;

namespace IdentityV2.Migrations
{
    public partial class RoleNamesChanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PendingUser_Users_UserId",
                table: "PendingUser");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3,
                column: "Title",
                value: "Trainer");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 4,
                column: "Title",
                value: "Trainee");

            migrationBuilder.AddForeignKey(
                name: "FK_PendingUser_Users_UserId",
                table: "PendingUser",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PendingUser_Users_UserId",
                table: "PendingUser");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3,
                column: "Title",
                value: "Teacher");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 4,
                column: "Title",
                value: "Pupil");

            migrationBuilder.AddForeignKey(
                name: "FK_PendingUser_Users_UserId",
                table: "PendingUser",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }
    }
}
