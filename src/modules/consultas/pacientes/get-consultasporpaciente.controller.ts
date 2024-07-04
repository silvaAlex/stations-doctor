import { Request, Response} from 'express'
import { GetConsultasPorMedicoUseCase as GetConsultasPorPacienteUseCase } from './get-consultasporpaciente.useCase';

export class GetConsultasPorMedicoConntroller {
    constructor(){}

    async handler (request: Request, response: Response) {
        const useCase = new GetConsultasPorPacienteUseCase();

        try
        {
            const { params } = request;
            const result = await useCase.execute(params.cpf);

            if(!result)
                return response.status(404).json(`paciente com cpf: ${params.cpf} não existe`)
            
            return response.status(200).json(result);
        }
        catch(err){
            return response.status(400).json(JSON.stringify(err))
        }
    }
}