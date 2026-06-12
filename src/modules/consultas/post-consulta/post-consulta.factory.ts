import { PostConsultaUseCase } from './post-consulta.useCase'
import { PostConsultaConntroller } from './post-consulta.controller'
import { PacienteRepository } from '../../../infra/repository/paciente/paciente.repository'
import { ConsultaRepository } from '../../../infra/repository/consulta/consulta.repository'
import { MedicoRepository } from '../../../infra/repository/medicos/medico.repository'

export const CreateConsultaFactory = () => {
  const pacienteRepository = new PacienteRepository()
  const consultaRepository = new ConsultaRepository()
  const medicoRepository = new MedicoRepository()
  const createConsultas = new PostConsultaUseCase(
    consultaRepository,
    pacienteRepository,
    medicoRepository,
  )
  const createConsultasController = new PostConsultaConntroller(createConsultas)
  return createConsultasController
}
