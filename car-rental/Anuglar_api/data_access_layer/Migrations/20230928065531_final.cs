using Microsoft.EntityFrameworkCore.Migrations;

namespace data_access_layer.Migrations
{
    public partial class final : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsBooked",
                table: "userbookings",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "request",
                table: "userbookings",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsBooked",
                table: "userbookings");

            migrationBuilder.DropColumn(
                name: "request",
                table: "userbookings");
        }
    }
}
