import { Request, Response } from 'express'
import { ZodError } from 'zod'
import { CpfParamSchema } from '../../../schemas/consulta.schema'
import { GetConsultasPorMedicoUseCase as GetConsultasPorPacienteUseCase } from './get-consultasporpaciente.useCase'

export class GetConsultasPorPacienteConntroller {
    constructor() { }

    async handler(request: Request, response: Response) {
        const useCase = new GetConsultasPorPacienteUseCase()

        try {
            const { cpf } = CpfParamSchema.parse(request.params)
            const result = await useCase.execute(cpf)

            if (!result)
                return response
                    .status(404)
                    .json(`paciente com cpf: ${cpf} não existe`)

            return response.status(200).json(result)
        } catch (err) {
            if (err instanceof ZodError) {
                return response.status(400).json({ issues: err.issues })
            }
            return response.status(400).json(JSON.stringify(err))
        }
    }
}
