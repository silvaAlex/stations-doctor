
interface EspecialidadeDTO {
    nome: string,
}

export interface MedicoDTO {
    id?: string;
    username: string;
    crm: string,
    especialidade: EspecialidadeDTO[];
};