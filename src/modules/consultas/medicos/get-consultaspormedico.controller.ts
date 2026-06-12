import { Request, Response } from 'express'
import { ZodError } from 'zod'
import { CrmParamSchema } from '../../../schemas/consulta.schema'
import { GetConsultasPorPacienteUseCase } from './get-consultaspormedico.useCase'

export class GetConsultasPorMedicoConntroller {
    constructor() { }

    async handler(request: Request, response: Response) {
        const useCase = new GetConsultasPorPacienteUseCase()

        try {
            const { crm } = CrmParamSchema.parse(request.params)
            const result = await useCase.execute(crm)

            if (!result)
                return response
                    .status(404)
                    .json(`medico com crm: ${crm} não existe`)

            return response.status(200).json(result)
        } catch (err) {
            if (err instanceof ZodError) {
                return response.status(400).json({ issues: err.issues })
            }
            return response.status(400).json(JSON.stringify(err))
        }
    }
}
