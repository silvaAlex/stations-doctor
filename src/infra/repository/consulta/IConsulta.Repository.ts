import { ConsultaDTO, IConsultaPorMedicoCRM, IConsultaPorMedicoId, IConsultaPorPaciente } from "../../../DTOs/Consulta";

export interface IConsultaRepository {
    register(consultaData: ConsultaDTO): Promise<ConsultaDTO | null>
    getConsultaPorMedicoId(medicoId: string): Promise<IConsultaPorMedicoId[]>
    getConsultaPorMedicoCRM(crm: string): Promise<IConsultaPorMedicoCRM[]>
    getConsultaPorPaciente(cpf: string): Promise<IConsultaPorPaciente[]>
    getConsulta(consultaData: ConsultaDTO): Promise<ConsultaDTO | null>
}