import cron from 'node-cron'
import { prismaClient } from '../../../prisma/prismaClient'

export const startPatientReminderCron = () => {
    // Roda todos os dias às 08:00
    cron.schedule('0 8 * * *', async () => {
        console.log('[CRON] Iniciando rotina de lembretes para pacientes...')

        try {
            const todayStart = new Date()
            todayStart.setHours(0, 0, 0, 0)

            const todayEnd = new Date()
            todayEnd.setHours(23, 59, 59, 999)

            const consultasHoje = await prismaClient.consulta.findMany({
                where: {
                    dataAgendamento: {
                        gte: todayStart,
                        lte: todayEnd
                    }
                },
                include: {
                    paciente: true,
                    medico: true
                }
            })

            if (consultasHoje.length === 0) {
                console.log('[CRON] Nenhuma consulta agendada para hoje.')
                return
            }

            consultasHoje.forEach(consulta => {
                const hora = consulta.dataAgendamento.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                console.log(`\n[LEMBRETE PACIENTE] -> Olá ${consulta.paciente.nomePaciente}!`)
                console.log(`[LEMBRETE PACIENTE] -> Lembrete: você tem uma consulta hoje às ${hora} com o Dr(a). ${consulta.medico.nomeMedico}.\n`)
            })

        } catch (error) {
            console.error('[CRON] Erro ao buscar consultas para lembrete:', error)
        }
    })

    console.log('Patient Reminder Cron Job started.')
}
