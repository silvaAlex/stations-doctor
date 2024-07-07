import { Request, Response } from 'express'
import { GetAllMedicosUseCase } from './get-all-medico.useCase'

export class GetAllMedicosController {
  constructor(private useCase: GetAllMedicosUseCase) {}

  async handler(request: Request, response: Response) {
    try {
      const { body } = request
      console.log(body)

      const date = new Date(body.date)

      const result = await this.useCase.execute(date)

      return response.status(200).json(result)
    } catch (err) {
      return response.status(400).json(JSON.stringify(err))
    }
  }
}
