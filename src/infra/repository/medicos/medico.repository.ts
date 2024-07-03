import { prismaClient } from "../../../../prisma/prismaClient";

interface IEspecialidade {
    nome: string
}

export interface IMedico {
    username: string,
    crm: string,
    especialidade: IEspecialidade[]
}

export class MedicoRepository { 
    async register(medico: IMedico) {
        const medicoExist = await this.getMedico(medico.crm);

        if(medicoExist)
            return;

        if (medico.username === null || medico.username === undefined)
            return;

        if (medico.crm === null || medico.crm === undefined)
            return;

        return await prismaClient.medico.create({
            data: {
                username: medico.username,
                crm: medico.crm,
                especialidade: {
                    createMany: {
                        data: medico.especialidade
                    }
                }
            }
        })
    }

    async getMedico(crm: string) {
        try {
            const document = await prismaClient.medico.findFirst({
                where: {
                    crm
                }
            })
            return document;
        } catch (error) {
           return null 
        }
    }
}