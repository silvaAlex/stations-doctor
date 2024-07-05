import { MedicoDTO } from '../../../DTOs/Medico';


export interface IMedicoRepository {
    register(medico: MedicoDTO) : Promise<MedicoDTO | null>,
    getMedico(crm: string): Promise<MedicoDTO | null>,
    getAll(): Promise<MedicoDTO[]>,
    getAllDisponiveis(date: Date): Promise<MedicoDTO[]>,
}