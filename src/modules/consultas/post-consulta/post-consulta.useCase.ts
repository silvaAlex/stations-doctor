import { ConsultaDTO } from '../../../DTOs/Consulta'
import { IExpediente } from '../../../DTOs/Medico'
import { IConsultaRepository } from '../../../infra/repository/consulta/IConsulta.Repository'
import { IPacienteRepository } from '../../../infra/repository/paciente/IPaciente.Repository'

import { convertToUTCDate } from '../../../utils/Utils'

export class PostConsultaUseCase {
  constructor(private consultaRepository: IConsultaRepository, private pacienteRepository: IPacienteRepository) { }

  async execute(consultaDTO: ConsultaDTO) {
    const trabalhaNesseHorario = await this.getAllConsultas(consultaDTO)

    if (!trabalhaNesseHorario) {
      throw new Error(
        'O horário da consulta está fora do horário de trabalho do médico',
      )
    }

    const paciente = await this.pacienteRepository.register(consultaDTO.paciente)

    if (paciente) {
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

  private async getAllConsultas(consultaDTO: ConsultaDTO) {
    const consultas = await this.consultaRepository.getConsultaPorMedicoId(consultaDTO.medicoId)

    const diasSemana = [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
    ]

    const currentDate = new Date()
    const diaDaSemana = diasSemana[consultaDTO.dataAgendamento.getDay()];
    const consultasDisponiveis = consultas.map(consulta => {
      if (consulta) {
        const expediente: IExpediente = JSON.parse(consulta.medico.expediente);

        const trabalhaNesseDia = expediente.diasSemana.includes(diaDaSemana);
        if (trabalhaNesseDia) {
          const startTime = convertToUTCDate(consulta.dataAgendamento, expediente.horarioAntedimento.start)
          const endTime = convertToUTCDate(consulta.dataAgendamento, expediente.horarioAntedimento.end)
          return { startTime, endTime }
        }
      }
      return {}
    })

    return consultasDisponiveis.some(({ startTime, endTime }) => {
      if (startTime === undefined || endTime === undefined)
        return false;
      if (consultaDTO.dataAgendamento < currentDate)
        return false
      consultaDTO.dataAgendamento >= startTime && consultaDTO.dataAgendamento <= endTime
    })
  }
}

