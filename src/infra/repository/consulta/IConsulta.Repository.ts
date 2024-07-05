import { ConsultaDTO } from "../../../DTOs/Consulta";
import { IConsulta, IConsultaPorMedicoCRM, IConsultaPorMedicoId, IConsultaPorPaciente } from "./Consulta";

export interface IConsultaRepository {
    register(consultaData: ConsultaDTO) : Promise<IConsulta | null>
    getConsultaPorMedicoId(medicoId: string) : Promise<IConsultaPorMedicoId[]>
    getConsultaPorMedicoCRM(crm: string) : Promise<IConsultaPorMedicoCRM[]>
    getConsultaPorPaciente(cpf: string) : Promise<IConsultaPorPaciente[]>
    getConsulta(consultaData: IConsulta): Promise<IConsulta | null>
}