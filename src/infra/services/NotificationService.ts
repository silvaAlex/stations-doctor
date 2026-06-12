import { EventEmitter } from 'node:events'
import { ConsultaDTO } from '../../DTOs/Consulta'
import { MedicoDTO } from '../../DTOs/Medico'

class NotificationService extends EventEmitter {
    constructor() {
        super()
        this.on('consulta_agendada', this.handleConsultaAgendada)
    }

    private handleConsultaAgendada(payload: { medico: MedicoDTO, consulta: ConsultaDTO }) {
        const { medico, consulta } = payload
        const data = new Date(consulta.dataAgendamento).toLocaleString('pt-BR')
        
        console.log(`\n[NOTIFICAÇÃO] -> Enviando email para o Dr(a). ${medico.nomeMedico}...`)
        console.log(`[NOTIFICAÇÃO] -> Nova consulta agendada para o dia e horário: ${data}\n`)
    }

    public notifyConsultaAgendada(medico: MedicoDTO, consulta: ConsultaDTO) {
        this.emit('consulta_agendada', { medico, consulta })
    }
}

export const notificationService = new NotificationService()
