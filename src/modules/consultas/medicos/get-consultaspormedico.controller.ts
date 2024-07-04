import { Request, Response } from 'express'
import { GetConsultasPorPacienteUseCase } from './get-consultaspormedico.useCase'

export class GetConsultasPorMedicoConntroller {
  constructor() {}

  async handler(request: Request, response: Response) {
    const useCase = new GetConsultasPorPacienteUseCase()

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
