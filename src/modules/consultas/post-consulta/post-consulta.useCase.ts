import { ConsultaDTO } from '../../../DTOs/Consuta'
import {
  ConsultaRepository,
  IConsulta,
} from '../../../infra/repository/consulta/consulta.repository'
import { PacienteRepository } from '../../../infra/repository/paciente/paciente.repository'

export class PostConsultaUseCase {
  private consultaRepository
  constructor() {
    this.consultaRepository = new ConsultaRepository()
  }
  async execute(consultaDTO: ConsultaDTO) {
    const pacienteRepository = new PacienteRepository()

    const isWithinWorkingHours =
      await this.getDataConsultasPorMedico(consultaDTO)

    if (!isWithinWorkingHours) {
      throw new Error(
        'O horário da consulta está fora do horário de trabalho do médico',
      )
    }

    const paciente = await pacienteRepository.register(consultaDTO.paciente)

    if (paciente !== undefined) {
      const consulta: IConsulta = {
        medicoId: consultaDTO.medicoId,
        dataAgendamento: consultaDTO.dataAgendamento,
        pacienteId: paciente.id,
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

  private async getDataConsultasPorMedico(consultaDTO: ConsultaDTO) {
    const consultasPorMedico = this.consultaRepository.getConsultaPorMedicoId(
      consultaDTO.medicoId,
    )

    const results = (await consultasPorMedico).map(
      (consultaMedico: { medico: { expediente: string } }) => {
        const expediente = JSON.parse(consultaMedico.medico.expediente)
        const startTime = new Date(
          `${consultaDTO.dataAgendamento}T${expediente.start}`,
        )
        const endTime = new Date(
          `${consultaDTO.dataAgendamento}T${expediente.end}`,
        )

        return { startTime, endTime }
      },
    )

    return results.some(({ startTime, endTime }) => {
      return (
        consultaDTO.dataAgendamento >= startTime &&
        consultaDTO.dataAgendamento <= endTime
      )
    })
  }
}
