import { ConsultaDTO } from '../../../DTOs/Consulta'
import { IExpediente } from '../../../DTOs/Medico'
import { AppError } from '../../../errors/AppError'
import { IConsultaRepository } from '../../../infra/repository/consulta/IConsulta.Repository'
import { IPacienteRepository } from '../../../infra/repository/paciente/IPaciente.Repository'
import { IMedicoRepository } from '../../../infra/repository/medicos/imedico.repository'

import { convertToUTCDate } from '../../../utils/convertToUTCDate'
import { getConsultaDurationByEspecialidade } from '../../../utils/durationHelper'
import { notificationService } from '../../../infra/services/NotificationService'

export class PostConsultaUseCase {
    constructor(
        private consultaRepository: IConsultaRepository,
        private pacienteRepository: IPacienteRepository,
        private medicoRepository: IMedicoRepository
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
        // Obter o médico para calcular as durações e verificar expediente
        const medico = await this.medicoRepository.getMedicoById(consultaDTO.medicoId)
        if (!medico) {
            throw new AppError('Médico não encontrado')
        }

        const dataAgendamento = new Date(consultaDTO.dataAgendamento)
        const durationMinutes = getConsultaDurationByEspecialidade(medico.especialidade)

        // Definir startTime e endTime da nova consulta
        const novaConsultaStart = new Date(dataAgendamento.getTime())
        const novaConsultaEnd = new Date(dataAgendamento.getTime() + durationMinutes * 60000)

        const currentDate = new Date()
        if (novaConsultaStart < currentDate) {
            throw new AppError('Não é possível agendar consultas no passado')
        }

        // Verifica se trabalha nesse dia e horário
        const expediente = medico.expediente as IExpediente
        const diaDaSemana = this.diasSemana[novaConsultaStart.getDay()]
        const trabalhaNesseDia = expediente.diasSemana.includes(diaDaSemana)

        if (!trabalhaNesseDia) {
            throw new AppError('O horário da consulta está fora do horário de trabalho do médico')
        }

        const expedienteStart = convertToUTCDate(novaConsultaStart, expediente.horarioAntedimento.start)
        const expedienteEnd = convertToUTCDate(novaConsultaStart, expediente.horarioAntedimento.end)

        if (novaConsultaStart < expedienteStart || novaConsultaEnd > expedienteEnd) {
            throw new AppError('O horário da consulta está fora do horário de trabalho do médico')
        }

        // Verificar conflitos de horário com outras consultas do mesmo médico
        const consultasDoMedico = await this.consultaRepository.getConsultaPorMedicoId(medico.id!)
        
        const temConflito = consultasDoMedico.some(c => {
            const existingStart = new Date(c.dataAgendamento)
            const especialidadeConsultaExistente = c.medico.especialidade || medico.especialidade // Fallback
            const existingDuration = getConsultaDurationByEspecialidade(especialidadeConsultaExistente)
            const existingEnd = new Date(existingStart.getTime() + existingDuration * 60000)

            // Checa sobreposição: Start1 < End2 e End1 > Start2
            return novaConsultaStart < existingEnd && novaConsultaEnd > existingStart
        })

        if (temConflito) {
            throw new AppError('O horário da consulta está em conflito com a agenda do médico')
        }

        // Registrar o paciente e a consulta
        const paciente = await this.pacienteRepository.register(consultaDTO.paciente)

        if (paciente) {
            const consulta: ConsultaDTO = {
                medicoId: consultaDTO.medicoId,
                dataAgendamento: consultaDTO.dataAgendamento,
                paciente: paciente
            }

            const novaConsulta = await this.consultaRepository.register(consulta)
            
            if (novaConsulta) {
                // Enviar notificação assíncrona ao médico (simulado com EventEmitter)
                notificationService.notifyConsultaAgendada(medico, novaConsulta)
            }

            return novaConsulta
        }
    }
}
