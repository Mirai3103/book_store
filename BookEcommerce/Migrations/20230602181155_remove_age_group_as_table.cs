using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookStore.Migrations
{
    /// <inheritdoc />
    public partial class remove_age_group_as_table : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Books_AgeGroups_AgeGroupId",
                table: "Books");

            migrationBuilder.DropTable(
                name: "AgeGroups");

            migrationBuilder.DropIndex(
                name: "IX_Books_AgeGroupId",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "AgeGroupId",
                table: "Books");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AgeGroupId",
                table: "Books",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "AgeGroups",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Description = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    MaxAge = table.Column<uint>(type: "int unsigned", nullable: false),
                    MinAge = table.Column<uint>(type: "int unsigned", nullable: false),
                    Name = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AgeGroups", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Books_AgeGroupId",
                table: "Books",
                column: "AgeGroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_Books_AgeGroups_AgeGroupId",
                table: "Books",
                column: "AgeGroupId",
                principalTable: "AgeGroups",
                principalColumn: "Id");
        }
    }
}
