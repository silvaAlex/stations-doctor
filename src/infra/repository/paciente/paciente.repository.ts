import { prismaClient } from '../../../../prisma/prismaClient'
import { PacienteDTO } from '../../../DTOs/Paciente'
import { IPacienteRepository } from './IPaciente.Repository'

export class PacienteRepository implements IPacienteRepository {
  async register(paciente: PacienteDTO): Promise<PacienteDTO | null> {
    const pacienteExist = await this.getPaciente(paciente.cpf)

    if (pacienteExist) return pacienteExist
    else {
      if (paciente.nomePaciente === null || paciente.nomePaciente === undefined)
        return null

      if (paciente.cpf === null || paciente.cpf === undefined) return null

      const dataNascimento = new Date(paciente.dataNascimento);

      return await prismaClient.paciente.create({
        data: {
          nomePaciente: paciente.nomePaciente,
          cpf: paciente.cpf,
          dataNascimento,
        },
      })
    }
  }

  private async getPaciente(cpf: string) {
    try {
      const medico = await prismaClient.paciente.findFirst({
        where: {
          cpf,
        },
      })
      return medico
    } catch (error) {
      return null
    }
  }
}
