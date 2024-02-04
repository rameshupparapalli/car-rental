using Microsoft.EntityFrameworkCore.Migrations;

namespace data_access_layer.Migrations
{
    public partial class test123 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cars",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Carid = table.Column<string>(nullable: false),
                    Maker = table.Column<string>(nullable: false),
                    Brand = table.Column<string>(nullable: false),
                    Image = table.Column<string>(nullable: false),
                    Rentalprice = table.Column<int>(nullable: false),
                    Availability = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cars", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "usersdata",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true),
                    Role = table.Column<string>(nullable: true),
                    Token = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_usersdata", x => x.Id);
                });


            migrationBuilder.Sql("INSERT INTO usersdata (Email, Password, Role) VALUES (N'ramesh@gmail.com', N'Ramesh@486', N'user')");
            migrationBuilder.Sql("INSERT INTO usersdata (Email, Password, Role) VALUES (N'raju@gmail.com', N'Raju@123', N'user')");
            migrationBuilder.Sql("INSERT INTO usersdata (Email, Password, Role) VALUES (N'raghu@gmail.com', N'Raghu@123', N'user')");
            migrationBuilder.Sql("INSERT INTO usersdata (Email, Password, Role) VALUES (N'harish@gmail.com', N'Harish@123', N'user')");
            migrationBuilder.Sql("INSERT INTO usersdata (Email, Password, Role) VALUES (N'teja@gmail.com', N'Teja@123', N'user')");
            migrationBuilder.Sql("INSERT INTO usersdata (Email, Password, Role) VALUES (N'admin@gmail.com', N'Admin@123', N'admin')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Cars");

            migrationBuilder.DropTable(
                name: "usersdata");
        }
    }
}
