import { IMedicoRepository } from '../../../infra/repository/medicos/imedico.repository'

export class GetAllMedicosUseCase {
  constructor(private medicoRepository: IMedicoRepository) {}
  async execute(date: Date) {
    const medicos = await this.medicoRepository.getAllDisponiveis(date)
    return medicos
  }
}
