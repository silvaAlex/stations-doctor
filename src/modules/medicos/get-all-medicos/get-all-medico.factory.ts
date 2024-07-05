import { MedicoRepository } from "../../../infra/repository/medicos/medico.repository";
import { GetAllMedicosUseCase } from './get-all-medico.useCase';
import { GetAllMedicosController } from './get-all-medico.controller'

export const getMedicoFactory = () => {
    const medicosRepository = new MedicoRepository();
    const getMedico = new GetAllMedicosUseCase(medicosRepository);
    const getMedicoController = new GetAllMedicosController(getMedico);
    return getMedicoController;
};