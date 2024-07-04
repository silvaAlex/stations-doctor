import { prismaClient } from '../../../../prisma/prismaClient'

interface IPaciente {
  dataNascimento: Date
  nomePaciente: string
  cpf: string
}

export class PacienteRepository {
  async register(paciente: IPaciente) {
    const pacienteExist = await this.getPaciente(paciente.cpf)

    if (pacienteExist) return pacienteExist
    else {
      if (paciente.nomePaciente === null || paciente.nomePaciente === undefined) return

      if (paciente.cpf === null || paciente.cpf === undefined) return

      return await prismaClient.paciente.create({
        data: {
          nomePaciente: paciente.nomePaciente,
          cpf: paciente.cpf,
          dataNascimento: paciente.dataNascimento,
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
