using Microsoft.EntityFrameworkCore.Migrations;

namespace StreamingService.Migrations
{
    public partial class RecordEntitychanged : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ByteSize",
                table: "EsStreamRecords");

            migrationBuilder.AddColumn<string>(
                name: "FileName",
                table: "EsStreamRecords",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PublicId",
                table: "EsStreamRecords",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileName",
                table: "EsStreamRecords");

            migrationBuilder.DropColumn(
                name: "PublicId",
                table: "EsStreamRecords");

            migrationBuilder.AddColumn<int>(
                name: "ByteSize",
                table: "EsStreamRecords",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
