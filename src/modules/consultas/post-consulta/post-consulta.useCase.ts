import { ConsultaDTO } from '../../../DTOs/Consulta'
import {
  ConsultaRepository,
} from '../../../infra/repository/consulta/Consulta.Repository'
import { PacienteRepository } from '../../../infra/repository/paciente/paciente.repository'

import { convertToUTCDate } from '../../../utils/Utils'

export class PostConsultaUseCase {
  private consultaRepository
  constructor() {
    this.consultaRepository = new ConsultaRepository()
  }
  async execute(consultaDTO: ConsultaDTO) {
    const pacienteRepository = new PacienteRepository()

    const isWithinWorkingHours =
      await this.checkWithinWorkingHours(consultaDTO)

    if (!isWithinWorkingHours) {
      throw new Error(
        'O horário da consulta está fora do horário de trabalho do médico',
      )
    }

    const paciente = await pacienteRepository.register(consultaDTO.paciente)

    if (paciente !== undefined) {
      const consulta: ConsultaDTO = {
        medicoId: consultaDTO.medicoId,
        dataAgendamento: consultaDTO.dataAgendamento,
        paciente: paciente,
      }

      const isAgendanmentoConflitante =
        await this.consultaRepository.getConsulta(consulta)

      if (isAgendanmentoConflitante) {
        throw new Error(
          'O horário da consulta está em conflito com a agenda do médico',
        )
      }

      return await this.consultaRepository.register(consulta)
    }
  }

  private async checkWithinWorkingHours(consultaDTO: ConsultaDTO) {
    const getMedico = await this.getDataConsultasPorMedico(consultaDTO.medicoId);

    const results = getMedico.map((consulta) => {
      if (consulta) {
        const expediente = JSON.parse(consulta.medico.expediente)
        const startTime = convertToUTCDate(consultaDTO.dataAgendamento, expediente.start)
        const endTime = convertToUTCDate(consultaDTO.dataAgendamento, expediente.endTime)

        return { startTime, endTime }
      }
      return {}
    })

    return results.some(({ startTime, endTime }) => {

      if (startTime === undefined || endTime === undefined)
        return false;
      consultaDTO.dataAgendamento >= startTime && consultaDTO.dataAgendamento <= endTime
    })
  }

  private async getDataConsultasPorMedico(medicoId: string) {
    const consultasPorMedico = this.consultaRepository
      .getConsultaPorMedicoId(medicoId,)

    return consultasPorMedico;
  }
}

