import { Request, Response } from 'express'
import { GetAllMedicosUseCase } from './get-all-medico.useCase'

export class GetAllMedicosController {
  constructor(private useCase: GetAllMedicosUseCase) {}

  async handler(request: Request<Date>, response: Response) {
    try {
      const { params } = request
      const result = await this.useCase.execute(params)

      return response.status(200).json(result)
    } catch (err) {
      return response.status(400).json(JSON.stringify(err))
    }
  }
}
