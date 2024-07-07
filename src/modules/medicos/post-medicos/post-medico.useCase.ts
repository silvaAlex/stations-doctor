import { MedicoDTO } from '../../../DTOs/Medico'
import { AppError } from '../../../errors/AppError'
import { IMedicoRepository } from '../../../infra/repository/medicos/IMedico.Repository'

export class PostMedicoUseCase {
  constructor(private medicoRepository: IMedicoRepository) {}

  async execute(medicoDTO: MedicoDTO) {
    const medico = await this.medicoRepository.getMedico(medicoDTO.crm)

    if (medico) {
      throw new AppError('Medico já existe!')
    }

    return await this.medicoRepository.register(medicoDTO)
  }
}
