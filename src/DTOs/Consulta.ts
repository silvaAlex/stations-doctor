import { PacienteDTO } from "./Paciente"

export interface ConsultaDTO {
  id?: string
  medicoId: string
  paciente: PacienteDTO
  dataAgendamento: Date
}
