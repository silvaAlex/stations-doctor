import { MedicoRepository } from "../../../infra/repository/medicos/medico.repository";

export class GetAllMedicosUseCase {
    constructor() { }

    async execute(date: Date) {
        const medicoRepository = new MedicoRepository();
       const medicos = await medicoRepository.getAllDisponiveis(date);
        return medicos;
    }
}