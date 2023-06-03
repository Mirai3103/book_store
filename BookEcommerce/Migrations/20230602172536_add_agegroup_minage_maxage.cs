using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookStore.Migrations
{
    /// <inheritdoc />
    public partial class add_agegroup_minage_maxage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<uint>(
                name: "MaxAge",
                table: "AgeGroups",
                type: "int unsigned",
                nullable: false,
                defaultValue: 0u);

            migrationBuilder.AddColumn<uint>(
                name: "MinAge",
                table: "AgeGroups",
                type: "int unsigned",
                nullable: false,
                defaultValue: 0u);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MaxAge",
                table: "AgeGroups");

            migrationBuilder.DropColumn(
                name: "MinAge",
                table: "AgeGroups");
        }
    }
}
