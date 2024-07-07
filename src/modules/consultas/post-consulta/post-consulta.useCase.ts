import { ConsultaDTO } from '../../../DTOs/Consulta'
import { IExpediente } from '../../../DTOs/Medico'
import { AppError } from '../../../errors/AppError'
import { IConsultaRepository } from '../../../infra/repository/consulta/IConsulta.Repository'
import { IPacienteRepository } from '../../../infra/repository/paciente/IPaciente.Repository'

import { convertToUTCDate } from '../../../utils/Utils'
interface IConsulta {
  startTime: Date,
  endTime: Date
}

export class PostConsultaUseCase {
  constructor(
    private consultaRepository: IConsultaRepository,
    private pacienteRepository: IPacienteRepository,
  ) { }

  private diasSemana = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ]



  async execute(consultaDTO: ConsultaDTO) {
    const trabalhaNesseHorario = await this.checkTrabalhaNesseDia(consultaDTO)

    if (!trabalhaNesseHorario) {
      throw new AppError(
        'O horário da consulta está fora do horário de trabalho do médico'
      )
    }

    const paciente = await this.pacienteRepository.register(consultaDTO.paciente)

    if (paciente) {
      const consulta: ConsultaDTO = {
        medicoId: consultaDTO.medicoId,
        dataAgendamento: consultaDTO.dataAgendamento,
        paciente: paciente
      }

      const isAgendanmentoConflitante = await this.consultaRepository.getConsulta(consulta)

      if (isAgendanmentoConflitante) {
        throw new AppError(
          'O horário da consulta está em conflito com a agenda do médico'
        )
      }

      return await this.consultaRepository.register(consulta)
    }
  }

  private async checkTrabalhaNesseDia(consultaDTO: ConsultaDTO) {
    const currentDate = new Date()
    const dataAgendamento = new Date(consultaDTO.dataAgendamento)
    const consultasDisponiveis = await this.getAllConsultas(dataAgendamento, consultaDTO.medicoId);
    const medicosDisponiveis = await this.getAllMedicosDisponiveis(dataAgendamento);
    let result: IConsulta[] = [];

    if (consultasDisponiveis.length > 0)
      result = consultasDisponiveis
    else
      result = medicosDisponiveis

    const naoTemConflito = result.some(({ startTime, endTime }) => {
      if (startTime === undefined || endTime === undefined) return false
      if (dataAgendamento < currentDate) return false
      return dataAgendamento >= startTime && dataAgendamento <= endTime
    })

    return naoTemConflito;
  }

  private async getAllConsultas(date: Date, medicoId: string): Promise<IConsulta[]> {
    const result: IConsulta[] = [];

    const consultas = await this.consultaRepository.getConsultaPorMedicoId(medicoId)

    const diaDaSemana = this.diasSemana[date.getDay()]

    consultas.map((consulta) => {
      if (consulta) {
        const expediente: IExpediente = JSON.parse(consulta.medico.expediente)

        const trabalhaNesseDia = expediente.diasSemana.includes(diaDaSemana)
        if (trabalhaNesseDia) {
          const startTime = convertToUTCDate(
            consulta.dataAgendamento,
            expediente.horarioAntedimento.start,
          )
          const endTime = convertToUTCDate(
            consulta.dataAgendamento,
            expediente.horarioAntedimento.end,
          )
          result.push({
            startTime,
            endTime
          })
        }
      }
    })

    return result;
  }

  private async getAllMedicosDisponiveis(date: Date) {
    const result: IConsulta[] = [];
    const medicos = await this.consultaRepository.getAllMedicos()

    console.log(JSON.stringify(medicos))

    const diaDaSemana = this.diasSemana[date.getDay()]

    medicos.map((medico) => {
      const expediente = medico.expediente
      const trabalhaNesseDia = expediente.diasSemana.includes(diaDaSemana)

      if (trabalhaNesseDia) {
        const startTime = convertToUTCDate(date, expediente.horarioAntedimento.start)
        const endTime = convertToUTCDate(date, expediente.horarioAntedimento.end)

        result.push({
          startTime,
          endTime
        })
      }
    })

    return result;
  }
}