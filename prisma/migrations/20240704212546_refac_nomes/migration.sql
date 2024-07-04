/*
  Warnings:

  - You are about to drop the column `appointmentDateTime` on the `Consulta` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Medico` table. All the data in the column will be lost.
  - You are about to drop the column `birthDay` on the `Paciente` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Paciente` table. All the data in the column will be lost.
  - Added the required column `dataAgendamento` to the `Consulta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomeMedico` to the `Medico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataNascimento` to the `Paciente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomePaciente` to the `Paciente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Consulta" DROP COLUMN "appointmentDateTime",
ADD COLUMN     "dataAgendamento" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Medico" DROP COLUMN "username",
ADD COLUMN     "nomeMedico" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Paciente" DROP COLUMN "birthDay",
DROP COLUMN "username",
ADD COLUMN     "dataNascimento" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "nomePaciente" TEXT NOT NULL;
