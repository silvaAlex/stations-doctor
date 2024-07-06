import { Request, Response } from 'express'
import { PostConsultaUseCase } from './post-consulta.useCase'
import { ConsultaDTO } from '../../../DTOs/Consulta'

export class PostConsultaConntroller {
  constructor(private useCase: PostConsultaUseCase) {}

  async handler(request: Request<ConsultaDTO>, response: Response) {
    try {
      const { params } = request
      const result = await this.useCase.execute(params)

      if (!result) return response.status(201).json(result)
    } catch (err) {
      return response.status(400).json(JSON.stringify(err))
    }
  }
}
