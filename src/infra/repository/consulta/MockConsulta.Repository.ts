import {
  ConsultaDTO,
  IConsultaPorMedicoCRM,
  IConsultaPorMedicoId,
  IConsultaPorPaciente,
} from '../../../DTOs/Consulta'
import { MedicoDTO } from '../../../DTOs/Medico'
import { IConsultaRepository } from './IConsulta.Repository'

export class MockConsultaRepository implements IConsultaRepository {
  private consultas: ConsultaDTO[] = []
  private medicos: MedicoDTO[] = []

  constructor(medico: MedicoDTO) {
    this.medicos.push(medico)
  }

  async register(consultaData: ConsultaDTO): Promise<ConsultaDTO | null> {
    this.consultas.push(consultaData)
    return consultaData
  }

  async getConsultaPorMedicoId(
    medicoId: string,
  ): Promise<IConsultaPorMedicoId[]> {
    const consultaPorMedico: IConsultaPorMedicoId[] = []
    const medico = await this.getMedicoPorId(medicoId)

    this.consultas.map((consulta) => {
      if (consulta.medicoId === medicoId) {
        consultaPorMedico.push({
          id: consulta.id,
          dataAgendamento: consulta.dataAgendamento,
          medico: {
            expediente: JSON.stringify(medico?.expediente)
          },
        })
      }
    })

    return consultaPorMedico
  }

  async getConsultaPorMedicoCRM(crm: string): Promise<IConsultaPorMedicoCRM[]> {
    const consultaPorMedico: IConsultaPorMedicoCRM[] = []

    const medico = await this.getMedicoPorCRM(crm)

    this.consultas.map((consulta) => {
      if (consulta.medicoId === medico?.id) {
        consultaPorMedico.push({
          id: consulta.id,
          dataAgendamento: consulta.dataAgendamento,
          paciente: {
            nomePaciente: consulta.paciente.nomePaciente,
            dataNascimento: consulta.paciente.dataNascimento,
          },
        })
      }
    })

    return consultaPorMedico
  }

  async getConsultaPorPaciente(cpf: string): Promise<IConsultaPorPaciente[]> {
    const consultaPorPaciente: IConsultaPorPaciente[] = []

    this.consultas.map(async (consulta) => {
      if (consulta.paciente.cpf === cpf) {
        const medico = await this.getMedicoPorId(consulta.medicoId)
        if (medico) {
          consultaPorPaciente.push({
            id: consulta.id,
            dataAgendamento: consulta.dataAgendamento,
            medico: {
              especialidade: medico.especialidade,
              nomeMedico: medico.nomeMedico,
            },
          })
        }
      }
    })

    return consultaPorPaciente
  }

  async getConsulta(consultaData: ConsultaDTO): Promise<ConsultaDTO | null> {
    const consulta = this.consultas.find((consulta) => {
      if (
        consulta.id === consultaData.medicoId &&
        consulta.dataAgendamento === consultaData.dataAgendamento
      )
        return consulta
    })

    return consulta || null
  }

  async getMedicoPorId(medicoId: string): Promise<MedicoDTO | null> {
    const medico = this.medicos.find((medico) => medico.id === medicoId)
    return medico || null
  }

  async getMedicoPorCRM(crm: string): Promise<MedicoDTO | null> {
    const medico = this.medicos.find((medico) => medico.crm === crm)
    return medico || null
  }

  async getAllMedicos(): Promise<MedicoDTO[]> {
    return this.medicos
  }
}
