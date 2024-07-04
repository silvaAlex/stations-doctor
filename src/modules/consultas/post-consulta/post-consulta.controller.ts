import { Request, Response} from 'express'
import { PostConsultaUseCase } from './post-consulta.useCase'
import { ConsultaDTO } from '../../../DTOs/Consuta';

export class PostConsultaConntroller {
    constructor(){}

    async handler (request: Request<ConsultaDTO>, response: Response) {
        const useCase = new PostConsultaUseCase();
        try
        {
            const { params } = request;
            const result = await useCase.execute(params);

            if(!result)
                return response.status(201).json(result)
        }
        catch(err){
            return response.status(400).json(JSON.stringify(err))
        }
    }
}