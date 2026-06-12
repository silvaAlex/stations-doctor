import { describe, it, before } from 'node:test'
import assert from 'node:assert/strict'
import { MedicoDTO } from '../../../../src/DTOs/Medico'
import { IMedicoRepository } from '../../../../src/infra/repository/medicos/imedico.repository'
import { MockMedicoRepository } from '../../../../src/infra/repository/medicos/MockMedico.Repository'
import { PostMedicoUseCase } from '../../../../src/modules/medicos/post-medicos/post-medico.useCase'

describe('POST Medico UseCase', () => {
  let mockMedicoRepository: IMedicoRepository
  let useCase: PostMedicoUseCase

  before(() => {
    mockMedicoRepository = new MockMedicoRepository()
    useCase = new PostMedicoUseCase(mockMedicoRepository)
  })

  it('deve inserir um novo Medico', async () => {
    const userData: MedicoDTO = {
      nomeMedico: 'Fernanda',
      especialidade: 'Cardiologista',
      crm: '00001-MG',
      expediente: {
        diasSemana: 'Segunda, Quarta, Sexta',
        horarioAntedimento: {
          start: '10:00',
          end: '20:00',
        },
      },
    }
    const result = await useCase.execute(userData)

    assert.deepEqual(result, userData)
  })

  it('não deve inserir um novo Medico com o mesmo CRM', async () => {
    const userData: MedicoDTO = {
      nomeMedico: 'Fernanda',
      especialidade: 'Cardiologista',
      crm: '00001-MG',
      expediente: {
        diasSemana: 'Segunda, Quarta, Sexta',
        horarioAntedimento: {
          start: '10:00',
          end: '20:00',
        },
      },
    }

    await assert.rejects(
      async () => {
        await useCase.execute(userData)
      },
      (err: Error) => {
        assert.strictEqual(err.message, 'Medico já existe!')
        return true
      }
    )
  })
})
