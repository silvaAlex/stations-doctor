import { MedicoDTO } from "../../../DTOs/Medico";
import { IMedicoRepository } from "../../../infra/repository/medicos/IMedico.Repository";
import { MedicoRepositoryInMemory } from '../../../infra/repository/medicos/Medico-InMemory.Repository';
import { PostMedicoUseCase } from './post-medico.useCase';

describe('POST medicos', () => {
    let medicosRepository: IMedicoRepository;
    let postMedicosUseCase: PostMedicoUseCase;

    beforeAll(() => {
        medicosRepository = new MedicoRepositoryInMemory()
        postMedicosUseCase = new PostMedicoUseCase(medicosRepository)
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

        const medico = await postMedicosUseCase.execute(userData)

        expect(medico).toHaveProperty("id");
        expect(medico?.nomeMedico).toBe("Fernanda");
        expect(medico?.crm).toBe('00001-MG')
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
        
        await expect(postMedicosUseCase.execute(userData))
            .rejects
            .toThrow('Medico já existe!');
    })
})