import { prismaClient } from '../../../../prisma/prismaClient'

export interface IConsulta {
  medicoId: string
  dataAgendamento: Date
  pacienteId: string
}

export class ConsultaRepository {
  async register(consulta: IConsulta) {
    return await prismaClient.consulta.create({
      data: {
        dataAgendamento: consulta.dataAgendamento,
        medicoId: consulta.medicoId,
        pacienteId: consulta.pacienteId,
      },
    })
  }

  async getConsultaPorMedicoId(medicoId: string) {
    const consultas = await prismaClient.consulta.findMany({
      where: {
        medicoId,
      },
      select: {
        dataAgendamento: true,
        medico: {
          select: {
            expediente: true,
          },
        },
      },
    })

    return consultas
  }

  async getConsultaPorMedico(crm: string) {
    const consultas = await prismaClient.consulta.findMany({
      where: {
        medico: {
          crm,
        },
      },
      select: {
        dataAgendamento: true,
        paciente: {
          select: {
            nomePaciente: true,
            dataNascimento: true,
          },
        },
      },
    })

    return consultas
  }

  async getConsultaPorPaciente(cpf: string) {
    const consultas = await prismaClient.consulta.findMany({
      where: {
        paciente: {
          cpf,
        },
      },
      select: {
        dataAgendamento: true,
        medico: {
          select: {
            nomeMedico: true,
            especialidade: true,
          },
        },
      },
    })

    return consultas
  }

  async getConsulta(consulta: IConsulta) {
    return await prismaClient.consulta.findFirst({
      where: {
        medicoId: consulta.medicoId,
        dataAgendamento: consulta.dataAgendamento,
      },
    })
  }
}
