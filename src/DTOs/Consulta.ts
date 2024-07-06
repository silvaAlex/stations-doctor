import { PacienteDTO } from "./Paciente"

export interface ConsultaDTO {
  id?: string
  medicoId: string
  paciente: PacienteDTO
  dataAgendamento: Date
}

export interface IConsultaPorMedicoId {
  id?: string,
  dataAgendamento: Date;
  medico: {
    expediente: string;
  };
}

export interface IConsultaPorPaciente {
  id?: string,
  dataAgendamento: Date;
  medico: {
    especialidade: string;
    nomeMedico: string;
  };
}

export interface IConsultaPorMedicoCRM {
  id?: string,
  dataAgendamento: Date;
  paciente: {
    dataNascimento: Date;
    nomePaciente: string;
  };
}
