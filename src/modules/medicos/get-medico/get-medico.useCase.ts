import { MedicoRepository } from '../../../infra/repository/medicos/medico.repository'

export class GetMedicoUseCase {
  constructor() {}

  async execute(crm: string) {
    const medicoRepository = new MedicoRepository()
    const medico = await medicoRepository.getMedico(crm)
    return medico
  }
}
