import { z } from 'zod'

export const ExpedienteSchema = z.object({
  diasSemana: z.string().min(1),
  horarioAntedimento: z.object({
    start: z.string().regex(/^\d{2}:\d{2}$/, 'Formato de horário inválido'),
    end: z.string().regex(/^\d{2}:\d{2}$/, 'Formato de horário inválido'),
  }),
})

export const MedicoSchema = z.object({
  nomeMedico: z.string().min(1),
  crm: z.string().min(1),
  especialidade: z.string().min(1),
  expediente: ExpedienteSchema,
})

export type MedicoSchemaType = z.infer<typeof MedicoSchema>
