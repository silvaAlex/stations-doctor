import { MedicoRepository } from '../../../infra/repository/medicos/Medico.Repository'
import { PostMedicoUseCase } from './post-medico.useCase'
import { PostMedicoConntroller } from './post-medico.controller'

export const CreateMedicoFactory = () => {
  const medicosRepository = new MedicoRepository()
  const createMedicos = new PostMedicoUseCase(medicosRepository)
  const createMedicosController = new PostMedicoConntroller(createMedicos)
  return createMedicosController
}
