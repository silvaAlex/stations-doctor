import { PacienteDTO } from "../../../DTOs/Paciente";

export interface IPacienteRepository {
    register(paciente:PacienteDTO) : Promise<PacienteDTO | null>
}