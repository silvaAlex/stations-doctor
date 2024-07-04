import { MedicoRepository } from '../../../infra/repository/medicos/medico.repository'
import { MedicoDTO } from '../../../DTOs/Medico'

export class PostMedicoUseCase {
  constructor() {}

  async execute(medicoDTO: MedicoDTO) {
    const medicoRepository = new MedicoRepository()

    const medico = await medicoRepository.getMedico(medicoDTO.crm)

    if (!medico) {
      return await medicoRepository.register(medicoDTO)
    }
  }
}
