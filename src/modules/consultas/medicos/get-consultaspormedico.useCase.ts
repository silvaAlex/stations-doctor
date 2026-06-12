import { ConsultaRepository } from '../../../infra/repository/consulta/consulta.repository'

export class GetConsultasPorPacienteUseCase {
  constructor() {}

  async execute(crm: string) {
    const consultaRepository = new ConsultaRepository()
    const consultas = await consultaRepository.getConsultaPorMedicoCRM(crm)
    return consultas
  }
}
