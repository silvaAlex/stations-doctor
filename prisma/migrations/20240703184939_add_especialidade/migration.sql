-- CreateTable
CREATE TABLE "Especialidade" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "medicoId" TEXT NOT NULL,

    CONSTRAINT "Especialidade_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Especialidade" ADD CONSTRAINT "Especialidade_medicoId_fkey" FOREIGN KEY ("medicoId") REFERENCES "Medico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
