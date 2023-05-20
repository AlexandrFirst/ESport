using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UserWorkflow.Esport.Migrations
{
    public partial class Sportlistinginit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ExerciseOwnerId",
                table: "Exercises",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsPublic",
                table: "Exercises",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_Exercises_ExerciseOwnerId",
                table: "Exercises",
                column: "ExerciseOwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Exercises_Trainers_ExerciseOwnerId",
                table: "Exercises",
                column: "ExerciseOwnerId",
                principalTable: "Trainers",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Exercises_Trainers_ExerciseOwnerId",
                table: "Exercises");

            migrationBuilder.DropIndex(
                name: "IX_Exercises_ExerciseOwnerId",
                table: "Exercises");

            migrationBuilder.DropColumn(
                name: "ExerciseOwnerId",
                table: "Exercises");

            migrationBuilder.DropColumn(
                name: "IsPublic",
                table: "Exercises");
        }
    }
}
