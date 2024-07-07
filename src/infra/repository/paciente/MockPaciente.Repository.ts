import { PacienteDTO } from '../../../DTOs/Paciente'
import { IPacienteRepository } from './IPaciente.Repository'

export class MockPacienteRepository implements IPacienteRepository {
  private pacientes: PacienteDTO[] = []

  async register(paciente: PacienteDTO): Promise<PacienteDTO | null> {
    const pacienteExist = await this.getPaciente(paciente.cpf)

    if (pacienteExist) return pacienteExist
    else {
      if (paciente.nomePaciente === null || paciente.nomePaciente === undefined)
        return null

      if (paciente.cpf === null || paciente.cpf === undefined) return null

      this.pacientes.push(paciente)
      return paciente
    }
  }

  private async getPaciente(cpf: string) {
    const paciente = this.pacientes.find((paciente) => paciente.cpf === cpf)
    return paciente || null
  }
}
