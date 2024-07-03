/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `Especialidade` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Especialidade_nome_key" ON "Especialidade"("nome");
