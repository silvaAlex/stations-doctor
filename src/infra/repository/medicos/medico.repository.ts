import { prismaClient } from '../../../../prisma/prismaClient'
import { IMedicoRepository } from './IMedico.Repository'
import { MedicoDTO } from '../../../DTOs/Medico'
import { convertToUTCDate } from '../../../utils/Utils'

export class MedicoRepository implements IMedicoRepository {
  async register(medico: MedicoDTO): Promise<MedicoDTO | null> {
    const medicoExist = await this.getMedico(medico.crm)

    if (medicoExist) return medicoExist

    if (medico.nomeMedico === null || medico.nomeMedico === undefined)
      return null

    if (medico.crm === null || medico.crm === undefined) return null

    const medicoCreated = await prismaClient.medico.create({
      data: {
        nomeMedico: medico.nomeMedico,
        crm: medico.crm,
        especialidade: medico.especialidade,
        expediente: JSON.stringify(medico.expediente),
      },
    })

    const medicoDTO: MedicoDTO = {
      id: medicoCreated.id,
      nomeMedico: medicoCreated.nomeMedico,
      crm: medicoCreated.crm,
      especialidade: medicoCreated.especialidade,
      expediente: JSON.parse(medicoCreated.expediente),
    }

    return medicoDTO
  }

  async getMedico(crm: string): Promise<MedicoDTO | null> {
    try {
      const medico = await prismaClient.medico.findFirst({
        where: {
          crm,
        },
      })
      if (medico) {
        const medicoDTO: MedicoDTO = {
          id: medico.id,
          nomeMedico: medico?.nomeMedico,
          crm: medico?.crm,
          expediente: JSON.parse(medico?.expediente),
          especialidade: medico.especialidade,
        }
        return medicoDTO
      }
      return null
    } catch (error) {
      return null
    }
  }

  async getAll(): Promise<MedicoDTO[]> {
    const medicosDisponiveis: MedicoDTO[] = []

    const medicos = await prismaClient.medico.findMany({
      select: {
        id: true,
        crm: true,
        consulta: true,
        especialidade: true,
        nomeMedico: true,
        expediente: true,
      },
    })

    medicos.map((medico) => {
      medicosDisponiveis.push({
        nomeMedico: medico.nomeMedico,
        crm: medico.crm,
        especialidade: medico.especialidade,
        expediente: JSON.parse(medico.expediente),
      })

      return medicosDisponiveis
    })

    return medicosDisponiveis
  }

  async getAllDisponiveis(date: Date): Promise<MedicoDTO[]> {
    const medicos = await this.getAll()
    const currentDate = new Date()

    const diasSemana = [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
    ]

    const diaDaSemana = diasSemana[date.getDay()]

    const medicosDisponiveis = medicos.map((medico) => {
      const expediente = medico.expediente

      const trabalhaNesseDia = expediente.diasSemana.includes(diaDaSemana)

      if (trabalhaNesseDia) {
        const startTime = convertToUTCDate(
          date,
          expediente.horarioAntedimento.start,
        )
        const endTime = convertToUTCDate(
          date,
          expediente.horarioAntedimento.end,
        )

        if (date < currentDate) return null
        if (date >= startTime && date <= endTime) {
          return medico
        }
      }
      return null
    })

    return medicosDisponiveis.filter((m) => m !== null).map((medico) => medico)
  }
}
