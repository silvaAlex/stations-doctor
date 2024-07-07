import { Request, Response } from 'express'
import { PostConsultaUseCase } from './post-consulta.useCase'

export class PostConsultaConntroller {
  constructor(private useCase: PostConsultaUseCase) {}

  async handler(request: Request, response: Response) {
    try {
      const result = await this.useCase.execute(request.body)
      return response.status(201).json(result)
    } catch (err) {
      console.log(err)
      return response.status(400).send(JSON.stringify(err))
    }
  }
}
