import { Request, Response} from 'express'
import { GetAllMedicosUseCase } from './get-all-medico.useCase';

export class GetAllMedicosConntroller {
    constructor(){}

    async handler (request: Request<Date>, response: Response) {
        const useCase = new GetAllMedicosUseCase();
        try
        {
            const { params } = request;
            const result = await useCase.execute(params);
            
            return response.status(200).json(result);
        }
        catch(err){
            return response.status(400).json(JSON.stringify(err))
        }
    }
}