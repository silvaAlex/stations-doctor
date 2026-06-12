import { z } from 'zod'

export const PacienteSchema = z.object({
  nomePaciente: z.string().min(1),
  cpf: z.string().min(1),
  dataNascimento: z.preprocess(
    (value) => (typeof value === 'string' ? new Date(value) : value),
    z.date(),
  ),
})

export type PacienteSchemaType = z.infer<typeof PacienteSchema>
