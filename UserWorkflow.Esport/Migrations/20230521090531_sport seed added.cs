using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UserWorkflow.Esport.Migrations
{
    public partial class sportseedadded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Exercises_Trainers_ExerciseOwnerId",
                table: "Exercises");

            migrationBuilder.AddColumn<bool>(
                name: "IsPending",
                table: "TraineeShedules",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "Sports",
                columns: new[] { "Id", "Description", "Name", "Type" },
                values: new object[,]
                {
                    { 1, "Suitable for everyone", "Swimming", 2 },
                    { 2, "Suitable for everyone", "Karate", 0 },
                    { 3, "Suitable for everyone", "Powerlifting", 2 },
                    { 4, "Suitable for everyone", "Car racing", 1 },
                    { 5, "Suitable for everyone", "Football", 1 },
                    { 6, "Suitable for everyone", "Basketball", 1 }
                });

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

            migrationBuilder.DeleteData(
                table: "Sports",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Sports",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Sports",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Sports",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Sports",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Sports",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DropColumn(
                name: "IsPending",
                table: "TraineeShedules");

            migrationBuilder.AddForeignKey(
                name: "FK_Exercises_Trainers_ExerciseOwnerId",
                table: "Exercises",
                column: "ExerciseOwnerId",
                principalTable: "Trainers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
