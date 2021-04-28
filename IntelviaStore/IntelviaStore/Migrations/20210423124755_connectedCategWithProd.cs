using Microsoft.EntityFrameworkCore.Migrations;

namespace IntelviaStore.Migrations
{
    public partial class connectedCategWithProd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CategoriesCategoryID",
                table: "Products",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Products_CategoriesCategoryID",
                table: "Products",
                column: "CategoriesCategoryID");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Categories_CategoriesCategoryID",
                table: "Products",
                column: "CategoriesCategoryID",
                principalTable: "Categories",
                principalColumn: "CategoryID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Categories_CategoriesCategoryID",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_CategoriesCategoryID",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "CategoriesCategoryID",
                table: "Products");
        }
    }
}
