import { prismaClient } from "../../../../prisma/prismaClient";

export interface IConsulta {
    medicoId: string,
    dataAgendamento: Date,
    pacienteId: string
}

export class ConsultaRepository { 
    async register(consulta: IConsulta) {
        const consultas = this.getConsultaPorMedicoId(consulta.medicoId);

        return await prismaClient.consulta.create({
            data: {
                appointmentDateTime: consulta.dataAgendamento,
                medicoId: consulta.medicoId,
                pacienteId: consulta.pacienteId,
            }
        })
    }

    async getConsultaPorMedicoId(id: string) {
        const consultas = await prismaClient.consulta.findMany({
            where: {
                medicoId: id,
            },
            select: {
                appointmentDateTime: true,
                medico: {
                    select: {
                        expediente: true
                    }
                }
            }  
        })

        return consultas;
    }

    async getConsulta(consulta: IConsulta) {
        return await prismaClient.consulta.findFirst({
            where: {
              medicoId: consulta.medicoId,
              appointmentDateTime: consulta.dataAgendamento
            }
        });
    }
}