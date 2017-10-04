using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace ARQSI_IT1.Migrations
{
    public partial class updateApresentacoes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MedicamentoId",
                table: "Apresentacao",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PosologiaId",
                table: "Apresentacao",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Apresentacao_MedicamentoId",
                table: "Apresentacao",
                column: "MedicamentoId");

            migrationBuilder.CreateIndex(
                name: "IX_Apresentacao_PosologiaId",
                table: "Apresentacao",
                column: "PosologiaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Apresentacao_Medicamento_MedicamentoId",
                table: "Apresentacao",
                column: "MedicamentoId",
                principalTable: "Medicamento",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Apresentacao_Posologia_PosologiaId",
                table: "Apresentacao",
                column: "PosologiaId",
                principalTable: "Posologia",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Apresentacao_Medicamento_MedicamentoId",
                table: "Apresentacao");

            migrationBuilder.DropForeignKey(
                name: "FK_Apresentacao_Posologia_PosologiaId",
                table: "Apresentacao");

            migrationBuilder.DropIndex(
                name: "IX_Apresentacao_MedicamentoId",
                table: "Apresentacao");

            migrationBuilder.DropIndex(
                name: "IX_Apresentacao_PosologiaId",
                table: "Apresentacao");

            migrationBuilder.DropColumn(
                name: "MedicamentoId",
                table: "Apresentacao");

            migrationBuilder.DropColumn(
                name: "PosologiaId",
                table: "Apresentacao");
        }
    }
}
