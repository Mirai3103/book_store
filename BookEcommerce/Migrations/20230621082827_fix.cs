using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookStore.Migrations
{
    /// <inheritdoc />
    public partial class fix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookAttribute_Books_BookId",
                table: "BookAttribute");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BookAttribute",
                table: "BookAttribute");

            migrationBuilder.RenameTable(
                name: "BookAttribute",
                newName: "BookAttributes");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BookAttributes",
                table: "BookAttributes",
                columns: new[] { "BookId", "AttributeName" });

            migrationBuilder.AddForeignKey(
                name: "FK_BookAttributes_Books_BookId",
                table: "BookAttributes",
                column: "BookId",
                principalTable: "Books",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookAttributes_Books_BookId",
                table: "BookAttributes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BookAttributes",
                table: "BookAttributes");

            migrationBuilder.RenameTable(
                name: "BookAttributes",
                newName: "BookAttribute");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BookAttribute",
                table: "BookAttribute",
                columns: new[] { "BookId", "AttributeName" });

            migrationBuilder.AddForeignKey(
                name: "FK_BookAttribute_Books_BookId",
                table: "BookAttribute",
                column: "BookId",
                principalTable: "Books",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
