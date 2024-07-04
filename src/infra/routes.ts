import { Router, Request } from 'express'
import { PostMedicoConntroller } from '../modules/medicos/post-medicos/post-medico.controller'
import { MedicoDTO } from '../DTOs/Medico'
import { GetAllMedicosConntroller } from '../modules/medicos/get-all-medicos/get-all-medico.controller'
import { ConsultaDTO } from '../DTOs/Consuta'
import { PostConsultaConntroller } from '../modules/consultas/post-consulta/post-consulta.controller'

const router = Router()

router.get('/medicos/getMedico', (request: Request<Date>, response) => {
  return new GetAllMedicosConntroller().handler(request, response)
})

router.post('/medicos/register', (request: Request<MedicoDTO>, response) => {
  new PostMedicoConntroller().handler(request, response)
})

router.post(
  '/consultas/register',
  (request: Request<ConsultaDTO>, response) => {
    new PostConsultaConntroller().handler(request, response)
  },
)

export { router }
