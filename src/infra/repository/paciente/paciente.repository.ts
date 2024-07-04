import { prismaClient } from '../../../../prisma/prismaClient'

interface IPaciente {
  birthDay: Date
  username: string
  cpf: string
}

export class PacienteRepository {
  async register(paciente: IPaciente) {
    const pacienteExist = await this.getPaciente(paciente.cpf)

    if (pacienteExist) return pacienteExist
    else {
      if (paciente.username === null || paciente.username === undefined) return

      if (paciente.cpf === null || paciente.cpf === undefined) return

      return await prismaClient.paciente.create({
        data: {
          username: paciente.username,
          cpf: paciente.cpf,
          birthDay: paciente.birthDay,
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
