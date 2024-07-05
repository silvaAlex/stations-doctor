export interface IConsulta {
  medicoId: string
  dataAgendamento: Date
  pacienteId: string
}

export interface IConsultaPorMedicoId {
  dataAgendamento: Date;
  medico: {
    expediente: string;
  };
}

export interface IConsultaPorPaciente {
  dataAgendamento: Date;
  medico: {
    especialidade: string;
    nomeMedico: string;
  };
}

export interface IConsultaPorMedicoCRM {
  dataAgendamento: Date;
  paciente: {
    dataNascimento: Date;
    nomePaciente: string;
  };
}