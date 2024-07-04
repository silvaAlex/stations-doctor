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

    async getConsultaPorMedicoId(medicoId: string) {
        const consultas = await prismaClient.consulta.findMany({
            where: {
                medicoId
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

    async getConsultaPorMedico(crm: string) {
        const consultas = await prismaClient.consulta.findMany({
            where: {
                medico: {
                    crm
                }
            },
            select: {
                appointmentDateTime: true,
                paciente: {
                    select: {
                        username: true,
                        birthDay: true
                    }
                }
            }  
        })

        return consultas;
    }

    async getConsultaPorPaciente(cpf: string) {
        const consultas = await prismaClient.consulta.findMany({
            where: {
                paciente: {
                    cpf
                }
            },
            select: {
                appointmentDateTime: true,
                medico: {
                    select: {
                        username: true,
                        especialidade: true
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