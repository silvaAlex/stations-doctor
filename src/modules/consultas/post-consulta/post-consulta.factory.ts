import { PostConsultaUseCase } from './post-consulta.useCase'
import { PostConsultaConntroller } from './post-consulta.controller'
import { PacienteRepository } from '../../../infra/repository/paciente/paciente.repository'
import { ConsultaRepository } from '../../../infra/repository/consulta/Consulta.Repository'

export const CreateConsultaFactory = () => {
  const pacienteRepository = new PacienteRepository()
  const consultaRepository = new ConsultaRepository()
  const createConsultas = new PostConsultaUseCase(
    consultaRepository,
    pacienteRepository,
  )
  const createConsultasController = new PostConsultaConntroller(createConsultas)
  return createConsultasController
}
