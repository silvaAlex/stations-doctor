import { MedicoDTO } from "../../../DTOs/Medico";
import { IMedicoRepository } from "../../../infra/repository/medicos/IMedico.Repository";
import { MockMedicoRepository } from "../../../infra/repository/medicos/MockMedico.Repository";
import { PostMedicoUseCase } from './post-medico.useCase'

describe('POST Medico UseCase', () => {
    
    let mockMedicoRepository: IMedicoRepository;
    let useCase: PostMedicoUseCase

    beforeAll(() => {
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
                    end: '20:00'
                }
            }
        };
        const result = await useCase.execute(userData)
        
        expect(result).toEqual(userData);
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
                    end: '20:00'
                }
            }
        };

        await expect(useCase.execute(userData))
            .rejects
            .toThrow('Medico já existe!');
    })  
})