using Microsoft.EntityFrameworkCore.Migrations;

namespace UserWorkflow.Esport.Migrations
{
    public partial class TableNameChanged : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GetFood_FoodDiets_FoodDiets_DietId",
                table: "GetFood_FoodDiets");

            migrationBuilder.DropForeignKey(
                name: "FK_GetFood_FoodDiets_Foods_FoodId",
                table: "GetFood_FoodDiets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_GetFood_FoodDiets",
                table: "GetFood_FoodDiets");

            migrationBuilder.RenameTable(
                name: "GetFood_FoodDiets",
                newName: "Food_FoodDiets");

            migrationBuilder.RenameIndex(
                name: "IX_GetFood_FoodDiets_FoodId",
                table: "Food_FoodDiets",
                newName: "IX_Food_FoodDiets_FoodId");

            migrationBuilder.RenameIndex(
                name: "IX_GetFood_FoodDiets_DietId",
                table: "Food_FoodDiets",
                newName: "IX_Food_FoodDiets_DietId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Food_FoodDiets",
                table: "Food_FoodDiets",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Food_FoodDiets_FoodDiets_DietId",
                table: "Food_FoodDiets",
                column: "DietId",
                principalTable: "FoodDiets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Food_FoodDiets_Foods_FoodId",
                table: "Food_FoodDiets",
                column: "FoodId",
                principalTable: "Foods",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Food_FoodDiets_FoodDiets_DietId",
                table: "Food_FoodDiets");

            migrationBuilder.DropForeignKey(
                name: "FK_Food_FoodDiets_Foods_FoodId",
                table: "Food_FoodDiets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Food_FoodDiets",
                table: "Food_FoodDiets");

            migrationBuilder.RenameTable(
                name: "Food_FoodDiets",
                newName: "GetFood_FoodDiets");

            migrationBuilder.RenameIndex(
                name: "IX_Food_FoodDiets_FoodId",
                table: "GetFood_FoodDiets",
                newName: "IX_GetFood_FoodDiets_FoodId");

            migrationBuilder.RenameIndex(
                name: "IX_Food_FoodDiets_DietId",
                table: "GetFood_FoodDiets",
                newName: "IX_GetFood_FoodDiets_DietId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_GetFood_FoodDiets",
                table: "GetFood_FoodDiets",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_GetFood_FoodDiets_FoodDiets_DietId",
                table: "GetFood_FoodDiets",
                column: "DietId",
                principalTable: "FoodDiets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GetFood_FoodDiets_Foods_FoodId",
                table: "GetFood_FoodDiets",
                column: "FoodId",
                principalTable: "Foods",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
