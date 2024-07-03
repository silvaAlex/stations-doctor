import { Router, Request } from 'express';
import { PostMedicoConntroller } from '../modules/medicos/post-medicos/post-medico.controller';
import { MedicoDTO } from '../modules/medicos/DTOs/Medico';
import { GetMedicoConntroller } from '../modules/medicos/get-medicos/get-medico.controller';

const router = Router();

router.get('/getMedicos', (request, response) => {
    new GetMedicoConntroller().handler(request, response);
})

router.post('/registerMedico', (request: Request<MedicoDTO>, response) => {
    new PostMedicoConntroller().handler(request,response);
})

export {router}