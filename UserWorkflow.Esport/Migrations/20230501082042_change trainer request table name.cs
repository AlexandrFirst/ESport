using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UserWorkflow.Esport.Migrations
{
    public partial class changetrainerrequesttablename : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GetTrainerRequests_TrainerShedules_TrainerSheduleId",
                table: "GetTrainerRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_TrainerResponses_GetTrainerRequests_TrainerRequestId",
                table: "TrainerResponses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_GetTrainerRequests",
                table: "GetTrainerRequests");

            migrationBuilder.RenameTable(
                name: "GetTrainerRequests",
                newName: "TrainerRequests");

            migrationBuilder.RenameIndex(
                name: "IX_GetTrainerRequests_TrainerSheduleId",
                table: "TrainerRequests",
                newName: "IX_TrainerRequests_TrainerSheduleId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TrainerRequests",
                table: "TrainerRequests",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TrainerRequests_TrainerShedules_TrainerSheduleId",
                table: "TrainerRequests",
                column: "TrainerSheduleId",
                principalTable: "TrainerShedules",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TrainerResponses_TrainerRequests_TrainerRequestId",
                table: "TrainerResponses",
                column: "TrainerRequestId",
                principalTable: "TrainerRequests",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TrainerRequests_TrainerShedules_TrainerSheduleId",
                table: "TrainerRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_TrainerResponses_TrainerRequests_TrainerRequestId",
                table: "TrainerResponses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TrainerRequests",
                table: "TrainerRequests");

            migrationBuilder.RenameTable(
                name: "TrainerRequests",
                newName: "GetTrainerRequests");

            migrationBuilder.RenameIndex(
                name: "IX_TrainerRequests_TrainerSheduleId",
                table: "GetTrainerRequests",
                newName: "IX_GetTrainerRequests_TrainerSheduleId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_GetTrainerRequests",
                table: "GetTrainerRequests",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_GetTrainerRequests_TrainerShedules_TrainerSheduleId",
                table: "GetTrainerRequests",
                column: "TrainerSheduleId",
                principalTable: "TrainerShedules",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TrainerResponses_GetTrainerRequests_TrainerRequestId",
                table: "TrainerResponses",
                column: "TrainerRequestId",
                principalTable: "GetTrainerRequests",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
