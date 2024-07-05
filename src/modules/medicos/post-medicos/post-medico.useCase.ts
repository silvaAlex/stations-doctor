import { MedicoDTO } from '../../../DTOs/Medico'
import { IMedicoRepository } from '../../../infra/repository/medicos/IMedico.Repository'

export class PostMedicoUseCase {
  constructor(private medicoRepository: IMedicoRepository) {}

  async execute(medicoDTO: MedicoDTO) {
    const medico = await this.medicoRepository.getMedico(medicoDTO.crm)

    if(medico){
      throw new Error("Medico já existe!");
    }

    return await this.medicoRepository.register(medicoDTO);
  }
}
