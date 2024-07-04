-- CreateTable
CREATE TABLE "Paciente" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "birthDay" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,

    CONSTRAINT "Paciente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medico" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT NOT NULL,
    "crm" TEXT NOT NULL,
    "especialidade" TEXT NOT NULL,

    CONSTRAINT "Medico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consulta" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "appointmentDateTime" TIMESTAMP(3) NOT NULL,
    "medicoId" TEXT NOT NULL,
    "pacienteId" TEXT NOT NULL,

    CONSTRAINT "Consulta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Paciente_cpf_key" ON "Paciente"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Medico_crm_key" ON "Medico"("crm");

-- AddForeignKey
ALTER TABLE "Consulta" ADD CONSTRAINT "Consulta_medicoId_fkey" FOREIGN KEY ("medicoId") REFERENCES "Medico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consulta" ADD CONSTRAINT "Consulta_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
