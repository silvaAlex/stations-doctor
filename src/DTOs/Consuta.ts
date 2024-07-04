interface IPacienteDTO {
  id?: string
  dataNascimento: Date
  nomePaciente: string
  cpf: string
}

export interface ConsultaDTO {
  id?: string
  medicoId: string
  paciente: IPacienteDTO
  dataAgendamento: Date
}
