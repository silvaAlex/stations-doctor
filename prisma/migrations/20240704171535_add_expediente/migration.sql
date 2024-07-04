/*
  Warnings:

  - Added the required column `expediente` to the `Medico` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Medico" ADD COLUMN     "expediente" TEXT NOT NULL;
