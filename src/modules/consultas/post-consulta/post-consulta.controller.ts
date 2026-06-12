import { Request, Response } from 'express'
import { ZodError } from 'zod'
import { ConsultaSchema } from '../../../schemas/consulta.schema'
import { PostConsultaUseCase } from './post-consulta.useCase'

export class PostConsultaConntroller {
    constructor(private useCase: PostConsultaUseCase) { }

    async handler(request: Request, response: Response) {
        try {
            const consultaData = ConsultaSchema.parse(request.body)
            const result = await this.useCase.execute(consultaData)
            return response.status(201).json(result)
        } catch (err) {
            if (err instanceof ZodError) {
                return response.status(400).json({ issues: err.issues })
            }

            console.log(err)
            return response.status(400).send(JSON.stringify(err))
        }
    }
}
