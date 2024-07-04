import { Request, Response} from 'express'
import { PostMedicoUseCase } from './post-medico.useCase';
import { MedicoDTO } from '../../../DTOs/Medico';

export class PostMedicoConntroller {
    constructor(){}

    async handler (request: Request<MedicoDTO>, response: Response) {
        const useCase = new PostMedicoUseCase();

        try
        {
            const { params } = request;
            const result = await useCase.execute(params);

            if(!result)
                return response.status(404).json(`medico com crm: ${params.crm} já existe ou não foi possivel cadastrar`)
            
            return response.status(201).json(result.id);
        }
        catch(err){
            return response.status(400).json(JSON.stringify(err))
        }
    }
}