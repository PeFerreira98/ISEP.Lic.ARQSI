using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace ARQSI_IT1.Migrations
{
    public partial class ChangesToApresentacao : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Farmaco_Apresentacao_ApresentacaoId",
                table: "Farmaco");

            migrationBuilder.DropIndex(
                name: "IX_Farmaco_ApresentacaoId",
                table: "Farmaco");

            migrationBuilder.DropColumn(
                name: "ApresentacaoId",
                table: "Farmaco");

            migrationBuilder.AddColumn<int>(
                name: "FarmacoId",
                table: "Apresentacao",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Apresentacao_FarmacoId",
                table: "Apresentacao",
                column: "FarmacoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Apresentacao_Farmaco_FarmacoId",
                table: "Apresentacao",
                column: "FarmacoId",
                principalTable: "Farmaco",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Apresentacao_Farmaco_FarmacoId",
                table: "Apresentacao");

            migrationBuilder.DropIndex(
                name: "IX_Apresentacao_FarmacoId",
                table: "Apresentacao");

            migrationBuilder.DropColumn(
                name: "FarmacoId",
                table: "Apresentacao");

            migrationBuilder.AddColumn<int>(
                name: "ApresentacaoId",
                table: "Farmaco",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Farmaco_ApresentacaoId",
                table: "Farmaco",
                column: "ApresentacaoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Farmaco_Apresentacao_ApresentacaoId",
                table: "Farmaco",
                column: "ApresentacaoId",
                principalTable: "Apresentacao",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
