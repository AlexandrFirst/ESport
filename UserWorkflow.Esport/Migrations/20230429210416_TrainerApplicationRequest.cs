using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UserWorkflow.Esport.Migrations
{
    public partial class TrainerApplicationRequest : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GetTrainerRequests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TrainerSheduleId = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GetTrainerRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GetTrainerRequests_TrainerShedules_TrainerSheduleId",
                        column: x => x.TrainerSheduleId,
                        principalTable: "TrainerShedules",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TrainerResponses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TrainerRequestId = table.Column<int>(type: "int", nullable: false),
                    TrainerId = table.Column<int>(type: "int", nullable: false),
                    ApplicationTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrainerResponses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TrainerResponses_GetTrainerRequests_TrainerRequestId",
                        column: x => x.TrainerRequestId,
                        principalTable: "GetTrainerRequests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TrainerResponses_Trainers_TrainerId",
                        column: x => x.TrainerId,
                        principalTable: "Trainers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GetTrainerRequests_TrainerSheduleId",
                table: "GetTrainerRequests",
                column: "TrainerSheduleId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainerResponses_TrainerId",
                table: "TrainerResponses",
                column: "TrainerId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainerResponses_TrainerRequestId",
                table: "TrainerResponses",
                column: "TrainerRequestId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TrainerResponses");

            migrationBuilder.DropTable(
                name: "GetTrainerRequests");
        }
    }
}
