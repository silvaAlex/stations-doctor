import { describe, it, before } from 'node:test'
import assert from 'node:assert/strict'
import { MedicoDTO } from '../../../../src/DTOs/Medico'
import { IMedicoRepository } from '../../../../src/infra/repository/medicos/imedico.repository'
import { MockMedicoRepository } from '../../../../src/infra/repository/medicos/MockMedico.Repository'
import { GetAllMedicosUseCase } from '../../../../src/modules/medicos/get-all-medicos/get-all-medico.useCase'

describe('GET Medico UseCase', () => {
  let getAllMedicosUseCase: GetAllMedicosUseCase
  let mockMedicosRepository: IMedicoRepository

  before(async () => {
    mockMedicosRepository = new MockMedicoRepository()
    getAllMedicosUseCase = new GetAllMedicosUseCase(mockMedicosRepository)

    const userData: MedicoDTO = {
      nomeMedico: 'Fernanda',
      especialidade: 'Cardiologista',
      crm: ' 00001-MG',
      expediente: {
        diasSemana: 'Segunda, Quarta, Sexta',
        horarioAntedimento: {
          start: '10:00',
          end: '20:00',
        },
      },
    }

    await mockMedicosRepository.register(userData)
  })

  it('deve retornar uma lista de médicos disponíveis', async () => {
    const date = new Date('2024-07-08T10:15:00Z')

    const medicos = await getAllMedicosUseCase.execute(date)

    assert.ok(Array.isArray(medicos), 'Should be an array')
    if (medicos.length > 0) {
      assert.ok('nomeMedico' in medicos[0])
      assert.ok('crm' in medicos[0])
      assert.ok('especialidade' in medicos[0])
    }
  })
})
