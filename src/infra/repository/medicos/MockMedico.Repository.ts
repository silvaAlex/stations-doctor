import { MedicoDTO } from "../../../DTOs/Medico";
import { IMedicoRepository } from "./IMedico.Repository";
import { convertToUTCDate } from '../../../utils/Utils'

export class MockMedicoRepository implements IMedicoRepository {
    private medicos: MedicoDTO[] = []

    async register(medico: MedicoDTO): Promise<MedicoDTO | null> {
        const medicoExist = await this.getMedico(medico.crm)

        if (medicoExist)
            return medicoExist

        if (medico.nomeMedico === null || medico.nomeMedico === undefined)
            return null

        if (medico.crm === null || medico.crm === undefined)
            return null

        this.medicos.push(medico)
        return medico
    }

    async getMedico(crm: string): Promise<MedicoDTO | null> {
        const medico = this.medicos.find(medico => medico.crm === crm);
        return medico || null
    }

    async getAll(): Promise<MedicoDTO[]> {
        return this.medicos;
    }

    async getAllDisponiveis(date: Date): Promise<MedicoDTO[]> {
        const currentDate = new Date()
        const diasSemana = [
            'Domingo',
            'Segunda',
            'Terça',
            'Quarta',
            'Quinta',
            'Sexta',
            'Sábado',
        ]

        const diaDaSemana = diasSemana[date.getDay()];

        const medicosDisponiveis = this.medicos.map(medico => {
            const expediente = medico.expediente;

            const trabalhaNesseDia = expediente.diasSemana.includes(diaDaSemana);

            if (trabalhaNesseDia) {
                const startTime = convertToUTCDate(date, expediente.horarioAntedimento.start)
                const endTime = convertToUTCDate(date, expediente.horarioAntedimento.end)

                if(date < currentDate)
                    return null
                
                if (date >= startTime && date <= endTime) {
                    return medico
                }
            }
            return null;
        })

        return medicosDisponiveis.filter(m => m !== null).map(medico => {
            return medico
        });
    }
}