import { prismaClient } from '../../../../prisma/prismaClient'

interface IExpediente {
  diasSemana: string
  horarioAntedimento: {
    start: string
    end: string
  }
}

export interface IMedico {
  username: string
  crm: string
  especialidade: string
  expediente: IExpediente
}

export class MedicoRepository {
  async register(medico: IMedico) {
    const medicoExist = await this.getMedico(medico.crm)

    if (medicoExist) return

    if (medico.username === null || medico.username === undefined) return

    if (medico.crm === null || medico.crm === undefined) return

    return await prismaClient.medico.create({
      data: {
        username: medico.username,
        crm: medico.crm,
        especialidade: medico.especialidade,
        expediente: JSON.stringify(medico.expediente),
      },
    })
  }

  async getMedico(crm: string) {
    try {
      const medico = await prismaClient.medico.findFirst({
        where: {
          crm,
        },
      })
      return medico
    } catch (error) {
      return null
    }
  }

  async getAll() {
    const medicos = await prismaClient.medico.findMany({
      select: {
        id: true,
        crm: true,
        consulta: true,
        especialidade: true,
        username: true,
        expediente: true,
      },
    })

    return medicos
  }

  async getAllDisponiveis(date: Date) {
    let medicosDisponiveis = []
    const _medicos = await this.getAll()

    const diasSemana = [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
    ]

    medicosDisponiveis = _medicos.map((medico) => {
      if (medico.expediente) {
        const expediente: IExpediente = JSON.parse(medico.expediente)

        if (expediente.diasSemana.includes(diasSemana[date.getDay()])) {
          const startTime = new Date(
            `${date}T${expediente.horarioAntedimento.start}`,
          )
          const endTime = new Date(
            `${date}T${expediente.horarioAntedimento.end}`,
          )
          if (date >= startTime && date <= endTime) {
            medicosDisponiveis.push(medico)
          }
        }
      }
    })

    return medicosDisponiveis
  }
}
