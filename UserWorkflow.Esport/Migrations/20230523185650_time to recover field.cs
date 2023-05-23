using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UserWorkflow.Esport.Migrations
{
    public partial class timetorecoverfield : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "TimeToRecover",
                table: "Traumas",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.UpdateData(
                table: "Traumas",
                keyColumn: "Id",
                keyValue: 1,
                column: "TimeToRecover",
                value: 8640000000000L);

            migrationBuilder.UpdateData(
                table: "Traumas",
                keyColumn: "Id",
                keyValue: 2,
                column: "TimeToRecover",
                value: 17280000000000L);

            migrationBuilder.UpdateData(
                table: "Traumas",
                keyColumn: "Id",
                keyValue: 3,
                column: "TimeToRecover",
                value: 12960000000000L);

            migrationBuilder.UpdateData(
                table: "Traumas",
                keyColumn: "Id",
                keyValue: 4,
                column: "TimeToRecover",
                value: 13824000000000L);

            migrationBuilder.UpdateData(
                table: "Traumas",
                keyColumn: "Id",
                keyValue: 5,
                column: "TimeToRecover",
                value: 25920000000000L);

            migrationBuilder.UpdateData(
                table: "Traumas",
                keyColumn: "Id",
                keyValue: 6,
                column: "TimeToRecover",
                value: 20736000000000L);

            migrationBuilder.UpdateData(
                table: "Traumas",
                keyColumn: "Id",
                keyValue: 7,
                column: "TimeToRecover",
                value: 34560000000000L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TimeToRecover",
                table: "Traumas");
        }
    }
}
