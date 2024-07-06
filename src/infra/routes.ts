import { Router, Request } from 'express'
import { MedicoDTO } from '../DTOs/Medico'
import { ConsultaDTO } from '../DTOs/Consulta'
import { GetMedicoFactory } from '../modules/medicos/get-all-medicos/get-all-medico.factory'
import { CreateMedicoFactory } from '../modules/medicos/post-medicos/post-medico.factory'
import { CreateConsultaFactory } from '../modules/consultas/post-consulta/post-consulta.factory'
import { GetConsultasPorMedicoConntroller } from '../modules/consultas/medicos/get-consultaspormedico.controller'
import { GetConsultasPorPacienteConntroller } from '../modules/consultas/pacientes/get-consultasporpaciente.controller'

const router = Router()

router.get('/medicos/getMedico', (request: Request<Date>, response) => 
{
  GetMedicoFactory().handler(request, response)
})

router.post('/medicos/register', (request: Request<MedicoDTO>, response) => {
  CreateMedicoFactory().handler(request, response)
})

router.post('/consultas/register', (request: Request<ConsultaDTO>, response) => 
{
  CreateConsultaFactory().handler(request,response)
})

router.get('/consultas/pacientes', (request: Request, response) => {
  new GetConsultasPorMedicoConntroller().handler(request, response)
})

router.get('/consultas/medicos', (request: Request, response) => {
  new GetConsultasPorPacienteConntroller().handler(request, response)
})

export { router }
