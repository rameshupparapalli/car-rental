using Microsoft.EntityFrameworkCore.Migrations;

namespace data_access_layer.Migrations
{
    public partial class test1234 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "userbookings",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Carid = table.Column<string>(nullable: false),
                    Maker = table.Column<string>(nullable: false),
                    Brand = table.Column<string>(nullable: false),
                    Image = table.Column<string>(nullable: false),
                    Rentalprice = table.Column<int>(nullable: false),
                    startdate = table.Column<string>(nullable: false),
                    enddate = table.Column<string>(nullable: false),
                    noofdays = table.Column<int>(nullable: false),
                    totalprice = table.Column<int>(nullable: false),
                    email = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_userbookings", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "userbookings");
        }
    }
}
