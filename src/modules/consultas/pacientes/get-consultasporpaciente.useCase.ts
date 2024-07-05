import { ConsultaRepository } from '../../../infra/repository/consulta/Consulta.Repository'

export class GetConsultasPorMedicoUseCase {
  constructor() {}

  async execute(cpf: string) {
    const consultaRepository = new ConsultaRepository()
    const consultas = await consultaRepository.getConsultaPorPaciente(cpf)
    return consultas
  }
}
