using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UserWorkflow.Esport.Migrations
{
    public partial class orgadminrmemailconstraint : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_OrganisationAdministrators_Email",
                table: "OrganisationAdministrators");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "OrganisationAdministrators",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "OrganisationAdministrators",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrganisationAdministrators_Email",
                table: "OrganisationAdministrators",
                column: "Email",
                unique: true,
                filter: "[Email] IS NOT NULL");
        }
    }
}
