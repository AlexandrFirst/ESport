using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UserWorkflow.Esport.Migrations
{
    public partial class somechanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsProfileConfirmed",
                table: "Trainers",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "TelephoneNumber",
                table: "Trainers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsProfileConfirmed",
                table: "Trainees",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "TelephoneNumber",
                table: "Trainees",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsProfileConfirmed",
                table: "OrganisationAdministrators",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "TelephoneNumber",
                table: "OrganisationAdministrators",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsProfileConfirmed",
                table: "Administrators",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "TelephoneNumber",
                table: "Administrators",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Trainees_UserId",
                table: "Trainees",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Administrators_UserId",
                table: "Administrators",
                column: "UserId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Trainees_UserId",
                table: "Trainees");

            migrationBuilder.DropIndex(
                name: "IX_Administrators_UserId",
                table: "Administrators");

            migrationBuilder.DropColumn(
                name: "IsProfileConfirmed",
                table: "Trainers");

            migrationBuilder.DropColumn(
                name: "TelephoneNumber",
                table: "Trainers");

            migrationBuilder.DropColumn(
                name: "IsProfileConfirmed",
                table: "Trainees");

            migrationBuilder.DropColumn(
                name: "TelephoneNumber",
                table: "Trainees");

            migrationBuilder.DropColumn(
                name: "IsProfileConfirmed",
                table: "OrganisationAdministrators");

            migrationBuilder.DropColumn(
                name: "TelephoneNumber",
                table: "OrganisationAdministrators");

            migrationBuilder.DropColumn(
                name: "IsProfileConfirmed",
                table: "Administrators");

            migrationBuilder.DropColumn(
                name: "TelephoneNumber",
                table: "Administrators");
        }
    }
}
