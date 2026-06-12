import { z } from 'zod'
import { PacienteSchema } from './paciente.schema'
import { MedicoSchema } from './medico.schema'

export const ConsultaSchema = z.object({
  medicoId: z.string().min(1),
  dataAgendamento: z.preprocess(
    (value) => (typeof value === 'string' ? new Date(value) : value),
    z.date(),
  ),
  paciente: PacienteSchema,
})

export const CrmParamSchema = z.object({
  crm: z.string().min(1),
})

export const CpfParamSchema = z.object({
  cpf: z.string().min(1),
})

export type ConsultaSchemaType = z.infer<typeof ConsultaSchema>
