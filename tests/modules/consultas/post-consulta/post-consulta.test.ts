import { describe, it, before } from 'node:test'
import assert from 'node:assert/strict'
import { ConsultaDTO } from '../../../../src/DTOs/Consulta'
import { MedicoDTO } from '../../../../src/DTOs/Medico'
import { IConsultaRepository } from '../../../../src/infra/repository/consulta/IConsulta.Repository'
import { MockConsultaRepository } from '../../../../src/infra/repository/consulta/MockConsulta.Repository'
import { IMedicoRepository } from '../../../../src/infra/repository/medicos/imedico.repository'
import { MockMedicoRepository } from '../../../../src/infra/repository/medicos/MockMedico.Repository'
import { IPacienteRepository } from '../../../../src/infra/repository/paciente/IPaciente.Repository'
import { MockPacienteRepository } from '../../../../src/infra/repository/paciente/MockPaciente.Repository'
import { PostConsultaUseCase } from '../../../../src/modules/consultas/post-consulta/post-consulta.useCase'

describe('POST Consulta UseCase', () => {
    let mockMedicoRepository: IMedicoRepository
    let mockPacienteRepository: IPacienteRepository
    let mockConsultaRepository: IConsultaRepository
    let useCase: PostConsultaUseCase

    before(() => {
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
        mockMedicoRepository = new MockMedicoRepository()
        mockConsultaRepository = new MockConsultaRepository(userData)
        mockPacienteRepository = new MockPacienteRepository()

        useCase = new PostConsultaUseCase(
            mockConsultaRepository,
            mockPacienteRepository,
            mockMedicoRepository,
        )
    })

    it('não deve ser possivel agendar fora do horario de trabalho do medico', async () => {
        const medico = await mockMedicoRepository.getMedico('00001-MG')
        const date = new Date('2024-07-05T19:15:00Z')
        if (medico?.id) {
            const userData: ConsultaDTO = {
                medicoId: medico?.id,
                paciente: {
                    nomePaciente: 'Camila',
                    dataNascimento: new Date('2005-07-15'),
                    cpf: '20466840012',
                },
                dataAgendamento: date,
            }

            await assert.rejects(
                async () => {
                    await useCase.execute(userData)
                },
                (err: Error) => {
                    assert.strictEqual(err.message, 'O horário da consulta está fora do horário de trabalho do médico')
                    return true
                }
            )
        }
    })

    it('não deve ser possivel fazer agendamentos conflitantes', async () => {
        const medico = await mockMedicoRepository.getMedico('00001-MG')
        const date = new Date('2024-07-08T10:30:00Z')
        if (medico?.id) {
            const userData1: ConsultaDTO = {
                medicoId: medico?.id,
                paciente: {
                    nomePaciente: 'Camila',
                    dataNascimento: new Date('2005-07-15'),
                    cpf: '20466840012',
                },
                dataAgendamento: date,
            }

            const userData2: ConsultaDTO = {
                medicoId: medico?.id,
                paciente: {
                    nomePaciente: 'Gabriel',
                    dataNascimento: new Date('2000-09-04'),
                    cpf: '10466840012',
                },
                dataAgendamento: date,
            }

            await useCase.execute(userData1)

            await assert.rejects(
                async () => {
                    await useCase.execute(userData2)
                },
                (err: Error) => {
                    assert.strictEqual(err.message, 'O horário da consulta está em conflito com a agenda do médico')
                    return true
                }
            )
        }
    })

    it('deve ser possivel fazer agendamentos com sucesso', async () => {
        const medico = await mockMedicoRepository.getMedico('00001-MG')
        const date = new Date('2024-07-08T10:30:00Z')
        if (medico?.id) {
            const userData1: ConsultaDTO = {
                medicoId: medico?.id,
                paciente: {
                    nomePaciente: 'Camila',
                    dataNascimento: new Date('2005-07-15'),
                    cpf: '20466840012',
                },
                dataAgendamento: date,
            }

            const consulta = await useCase.execute(userData1)
            assert.ok(consulta?.id !== undefined, 'consulta deve ter id')
        }
    })
})
