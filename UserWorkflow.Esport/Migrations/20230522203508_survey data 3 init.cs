using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UserWorkflow.Esport.Migrations
{
    public partial class surveydata3init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BodyPart",
                table: "Traumas");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Traumas",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Traumas",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "BodyPartId",
                table: "Traumas",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AnswerType",
                table: "Questions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ParentQuestionId",
                table: "Questions",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "QuestionStage",
                table: "Questions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "BodyParts",
                columns: new[] { "Id", "Description", "ImageId", "Name" },
                values: new object[,]
                {
                    { 1, "Some shoulder description", null, "Shoulder" },
                    { 2, "Some neck description", null, "Neck" },
                    { 3, "Some backbone description", null, "Backbone" },
                    { 4, "Some lumbar description", null, "Lumbar" },
                    { 5, "Some arm description", null, "Arm" },
                    { 6, "Some arm description", null, "Forearm" },
                    { 7, "Some elbow description", null, "Elbow" },
                    { 8, "Some wrist description", null, "Wrist" },
                    { 9, "Some leg description", null, "Leg" },
                    { 10, "Some foot description", null, "Foot" },
                    { 11, "Some ankle description", null, "Ankle" },
                    { 12, "Some nose description", null, "Nose" },
                    { 13, "Some tendon description", null, "tendon " }
                });

            migrationBuilder.InsertData(
                table: "Traumas",
                columns: new[] { "Id", "BodyPartId", "Description", "HealDescription", "Name" },
                values: new object[,]
                {
                    { 1, 11, "very painful trauma", "Drink tea", "ankle fracture" },
                    { 2, 4, "very painful trauma", "Drink tea", "pain in the lumbar" },
                    { 3, 12, "very painful trauma", "Drink tea", "Blood from nose" },
                    { 4, 4, "very painful trauma", "Drink tea", "Fracture of the lumbar spine" },
                    { 5, 13, "very painful trauma", "Drink tea", "Achilles tendon sprain or tear" },
                    { 6, 11, "very painful trauma", "Drink tea", "Ankle sprains" },
                    { 7, 8, "very painful trauma", "Drink tea", "Pain in the wrist" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Traumas_BodyPartId",
                table: "Traumas",
                column: "BodyPartId");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_ParentQuestionId",
                table: "Questions",
                column: "ParentQuestionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_Questions_ParentQuestionId",
                table: "Questions",
                column: "ParentQuestionId",
                principalTable: "Questions",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Traumas_BodyParts_BodyPartId",
                table: "Traumas",
                column: "BodyPartId",
                principalTable: "BodyParts",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Questions_Questions_ParentQuestionId",
                table: "Questions");

            migrationBuilder.DropForeignKey(
                name: "FK_Traumas_BodyParts_BodyPartId",
                table: "Traumas");

            migrationBuilder.DropIndex(
                name: "IX_Traumas_BodyPartId",
                table: "Traumas");

            migrationBuilder.DropIndex(
                name: "IX_Questions_ParentQuestionId",
                table: "Questions");

            migrationBuilder.DeleteData(
                table: "BodyParts",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "BodyParts",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "BodyParts",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "BodyParts",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "BodyParts",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "BodyParts",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "BodyParts",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "BodyParts",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Traumas",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Traumas",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Traumas",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Traumas",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Traumas",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Traumas",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Traumas",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "BodyParts",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "BodyParts",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "BodyParts",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "BodyParts",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "BodyParts",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DropColumn(
                name: "BodyPartId",
                table: "Traumas");

            migrationBuilder.DropColumn(
                name: "AnswerType",
                table: "Questions");

            migrationBuilder.DropColumn(
                name: "ParentQuestionId",
                table: "Questions");

            migrationBuilder.DropColumn(
                name: "QuestionStage",
                table: "Questions");

            migrationBuilder.AlterColumn<int>(
                name: "Name",
                table: "Traumas",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Description",
                table: "Traumas",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "BodyPart",
                table: "Traumas",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
