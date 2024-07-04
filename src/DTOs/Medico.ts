interface IExpediente {
  diasSemana: string
  horarioAntedimento: {
    start: string
    end: string
  }
}

export interface MedicoDTO {
  id?: string
  username: string
  crm: string
  especialidade: string
  expediente: IExpediente
}
