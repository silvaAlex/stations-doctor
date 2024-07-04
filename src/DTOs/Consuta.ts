interface IPacienteDTO {
    id?: String,
    birthDay: Date,
    username: string,
    cpf: string
}

export interface ConsultaDTO {
    id?: string,
    medicoId: string,
    paciente: IPacienteDTO,
    dataAgendamento: Date
};