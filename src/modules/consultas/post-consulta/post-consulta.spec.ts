import { ConsultaDTO } from "../../../DTOs/Consulta";
import { MedicoDTO } from "../../../DTOs/Medico";
import { IConsultaRepository } from "../../../infra/repository/consulta/IConsulta.Repository";
import { MockConsultaRepository } from "../../../infra/repository/consulta/MockConsulta.Repository";
import { IMedicoRepository } from "../../../infra/repository/medicos/IMedico.Repository";
import { MockMedicoRepository } from "../../../infra/repository/medicos/MockMedico.Repository";
import { IPacienteRepository } from "../../../infra/repository/paciente/IPaciente.Repository";
import { MockPacienteRepository } from "../../../infra/repository/paciente/MockPaciente.Repository";
import { PostConsultaUseCase } from "./post-consulta.useCase";

describe('POST Consulta UseCase', () => {
    let mockMedicoRepository: IMedicoRepository;
    let mockPacienteRepository: IPacienteRepository;
    let mockConsultaRepository: IConsultaRepository;
    let useCase: PostConsultaUseCase;

    beforeAll(() => {
        const userData: MedicoDTO = {
            nomeMedico: 'Fernanda',
            especialidade: 'Cardiologista',
            crm: '00001-MG',
            expediente: {
                diasSemana: 'Segunda, Quarta, Sexta',
                horarioAntedimento: {
                    start: '10:00',
                    end: '20:00'
                }
            }
        };
        mockMedicoRepository = new MockMedicoRepository();
        mockConsultaRepository = new MockConsultaRepository(userData);
        mockPacienteRepository = new MockPacienteRepository();

        useCase = new PostConsultaUseCase(mockConsultaRepository, mockPacienteRepository)
    })

    it('não deve ser possivel agendar fora do horario de trabalho do medico', async () => {
        const medico = await mockMedicoRepository.getMedico('00001-MG')
        const date =  new Date('2024-07-05T19:15:00Z')
        if (medico?.id) {
            const userData: ConsultaDTO = {
                medicoId: medico?.id,
                paciente: {
                    nomePaciente: 'Camila',
                    dataNascimento: new Date('2005-07-15'),
                    cpf: '20466840012'
                },
                dataAgendamento: date
            }

            await expect(useCase.execute(userData))
                .rejects
                .toThrow('O horário da consulta está fora do horário de trabalho do médico');
        }
    })

    it('não deve ser possivel fazer agendamentos conflitantes', async () => {
        const medico = await mockMedicoRepository.getMedico('00001-MG')
        const date =  new Date('2024-07-08T10:30:00Z')
        if (medico?.id) {
            const userData1: ConsultaDTO = {
                medicoId: medico?.id,
                paciente: {
                    nomePaciente: 'Camila',
                    dataNascimento: new Date('2005-07-15'),
                    cpf: '20466840012'
                },
                dataAgendamento: date
            }

            const userData2: ConsultaDTO = {
                medicoId: medico?.id,
                paciente: {
                    nomePaciente: 'Gabriel',
                    dataNascimento: new Date('2000-09-04'),
                    cpf: '10466840012'
                },
                dataAgendamento: date
            }

            await useCase.execute(userData1)

            await expect(useCase.execute(userData2))
                .rejects
                .toThrow('O horário da consulta está em conflito com a agenda do médico');
        }
    })

    it('não deve ser possivel fazer agendamentos conflitantes', async () => {
        const medico = await mockMedicoRepository.getMedico('00001-MG')
        const date =  new Date('2024-07-08T10:30:00Z')
        if (medico?.id) {
            const userData1: ConsultaDTO = {
                medicoId: medico?.id,
                paciente: {
                    nomePaciente: 'Camila',
                    dataNascimento: new Date('2005-07-15'),
                    cpf: '20466840012'
                },
                dataAgendamento: date
            }

            const consulta = await useCase.execute(userData1)
            expect(consulta?.id).toHaveProperty('id');
        }
    })
})