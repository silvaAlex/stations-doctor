import { Request, Response } from 'express'
import { GetMedicoUseCase } from './get-medico.useCase'

export class GetMedicoConntroller {
  constructor() {}

  async handler(request: Request, response: Response) {
    const useCase = new GetMedicoUseCase()

    try {
      const { params } = request
      const result = await useCase.execute(params.crm)

      if (!result)
        return response
          .status(404)
          .json(`medico com crm: ${params.crm} não existe`)

      return response.status(200).json(result)
    } catch (err) {
      return response.status(400).json(JSON.stringify(err))
    }
  }
}
