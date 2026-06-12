import { Router, Request } from 'express'
import { GetMedicoFactory } from '../modules/medicos/get-all-medicos/get-all-medico.factory'
import { CreateMedicoFactory } from '../modules/medicos/post-medicos/post-medico.factory'
import { CreateConsultaFactory } from '../modules/consultas/post-consulta/post-consulta.factory'
import { GetConsultasPorMedicoConntroller } from '../modules/consultas/medicos/get-consultaspormedico.controller'
import { GetConsultasPorPacienteConntroller } from '../modules/consultas/pacientes/get-consultasporpaciente.controller'

import { loginFactory } from '../modules/auth/login/login.factory'
import { authMiddleware } from './middlewares/auth.middleware'

const router = Router()

router.post('/login', (request: Request, response) => {
    loginFactory().handle(request, response)
})

router.get('/medicos/getMedico', (request: Request, response) => {
  GetMedicoFactory().handler(request, response)
})

router.post('/medicos/register', authMiddleware, (request: Request, response) => {
  CreateMedicoFactory().handler(request, response)
})

router.post('/consultas/register', (request: Request, response) => {
    CreateConsultaFactory().handler(request, response)
  },
)

router.get('/consultas/medicos/:crm', (request: Request, response) => {
  new GetConsultasPorMedicoConntroller().handler(request, response)
})

router.get('/consultas/pacientes/:cpf', (request: Request, response) => {
  new GetConsultasPorPacienteConntroller().handler(request, response)
})

export { router }
