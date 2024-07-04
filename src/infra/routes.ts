import { Router, Request } from 'express';
import { PostMedicoConntroller } from '../modules/medicos/post-medicos/post-medico.controller';
import { MedicoDTO } from '../DTOs/Medico';
import { GetAllMedicosConntroller } from '../modules/medicos/get-all-medicos/get-all-medico.controller';

const router = Router();

router.get('/getMedicos', (request: Request<Date>, response) => {
    return new GetAllMedicosConntroller().handler(request, response);
})

router.post('/registerMedico', (request: Request<MedicoDTO>, response) => {
    new PostMedicoConntroller().handler(request,response);
})

export {router}