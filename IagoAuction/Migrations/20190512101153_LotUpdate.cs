using Microsoft.EntityFrameworkCore.Migrations;

namespace IagoAuction.Migrations
{
    public partial class LotUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PaintingId",
                table: "Lots",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "paintingId",
                table: "Lots",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Lots_paintingId",
                table: "Lots",
                column: "paintingId");

            migrationBuilder.AddForeignKey(
                name: "FK_Lots_Paintings_paintingId",
                table: "Lots",
                column: "paintingId",
                principalTable: "Paintings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lots_Paintings_paintingId",
                table: "Lots");

            migrationBuilder.DropIndex(
                name: "IX_Lots_paintingId",
                table: "Lots");

            migrationBuilder.DropColumn(
                name: "PaintingId",
                table: "Lots");

            migrationBuilder.DropColumn(
                name: "paintingId",
                table: "Lots");
        }
    }
}
