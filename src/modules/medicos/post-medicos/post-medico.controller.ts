import { Request, Response } from 'express'
import { ZodError } from 'zod'
import { PostMedicoUseCase } from './post-medico.useCase'
import { MedicoSchema } from '../../../schemas/medico.schema'

export class PostMedicoConntroller {
  constructor(private useCase: PostMedicoUseCase) {}

  async handler(request: Request, response: Response) {
    try {
      const medicoData = MedicoSchema.parse(request.body)
      const result = await this.useCase.execute(medicoData)

      if (!result)
        return response
          .status(404)
          .json(
            `medico com crm: ${medicoData.crm} já existe ou não foi possivel cadastrar`,
          )

      return response.status(201).json(result.id)
    } catch (err) {
      if (err instanceof ZodError) {
        return response.status(400).json({ issues: err.issues })
      }
      return response.status(400).json(JSON.stringify(err))
    }
  }
}
