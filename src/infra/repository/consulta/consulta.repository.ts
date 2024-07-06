import { prismaClient } from '../../../../prisma/prismaClient'
import { ConsultaDTO, IConsultaPorMedicoCRM, IConsultaPorMedicoId, IConsultaPorPaciente } from '../../../DTOs/Consulta';
import { IConsultaRepository } from './IConsulta.Repository';

export class ConsultaRepository implements IConsultaRepository {
  async register(consultaData: ConsultaDTO): Promise<ConsultaDTO | null> {
    if (consultaData.paciente.id) {
      const consulta =  await prismaClient.consulta.create({
        data: {
          dataAgendamento: consultaData.dataAgendamento,
          medicoId: consultaData.medicoId,
          pacienteId: consultaData.paciente.id
        },
        include: {
          paciente: true
        }
      })

      return consulta;
    }
    return null
  }

  async getConsultaPorMedicoId(medicoId: string): Promise<IConsultaPorMedicoId[]> {
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

  async getConsultaPorMedicoCRM(crm: string): Promise<IConsultaPorMedicoCRM[]> {
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

  async getConsultaPorPaciente(cpf: string): Promise<IConsultaPorPaciente[]> {
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

  async getConsulta(consultaData: ConsultaDTO): Promise<ConsultaDTO | null> {
    const consulta = await prismaClient.consulta.findFirst({
      where: {
        medicoId: consultaData.medicoId,
        dataAgendamento: consultaData.dataAgendamento,
      },
      include: {
        paciente: true
      }
    })
    return consulta;
  }
}

