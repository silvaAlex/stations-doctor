import { MedicoDTO } from '../../../DTOs/Medico';
import { IMedicoRepository } from './imedico.repository'
import { v4 as uuid } from "uuid";

export class MedicoRepositoryInMemory implements IMedicoRepository {
    private medicos: MedicoDTO[] = [];

    async register(medico: MedicoDTO): Promise<MedicoDTO | null> {
        Object.assign(medico, {
          id: uuid()
        });

        this.medicos.push(medico);
        return medico
    }
    async getMedico(crm: string): Promise<MedicoDTO | null> {
        const medico = this.medicos.find((medico) => {
            if(medico.crm === crm)
                return medico;
        });

        if(!medico)
          return null
        
        return medico;
    }

    async getAll(): Promise<MedicoDTO[]> {
       return this.medicos
    }

    async getAllDisponiveis(date: Date): Promise<MedicoDTO[]> {
        const medicosDisponiveis: MedicoDTO[] = []
        const _medicos = await this.getAll()
    
        const diasSemana = [
          'Domingo',
          'Segunda',
          'Terça',
          'Quarta',
          'Quinta',
          'Sexta',
          'Sábado',
        ]
    
        _medicos.map((medico) => {
          if (medico.expediente) {
            const expediente = medico.expediente
            if (expediente.diasSemana.includes(diasSemana[date.getDay()])) {
              const startTime = new Date(
                `${date}T${expediente.horarioAntedimento.start}`,
              )
              const endTime = new Date(
                `${date}T${expediente.horarioAntedimento.end}`,
              )
              if (date >= startTime && date <= endTime) {
                medicosDisponiveis.push(medico)
              }
            }
          }
        })
    
        return medicosDisponiveis
    }

}