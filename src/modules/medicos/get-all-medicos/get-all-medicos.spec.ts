import { MedicoDTO } from "../../../DTOs/Medico";
import { IMedicoRepository } from "../../../infra/repository/medicos/IMedico.Repository";
import { MedicoRepositoryInMemory } from '../../../infra/repository/medicos/Medico-InMemory.Repository';
import { GetAllMedicosUseCase } from "./get-all-medico.useCase";

describe('GET medicos', () => {
    let medicosRepository: IMedicoRepository;
    let getAllMedicosUseCase: GetAllMedicosUseCase;

    beforeAll(() => {
        medicosRepository = new MedicoRepositoryInMemory()
        getAllMedicosUseCase = new GetAllMedicosUseCase(medicosRepository)

        const userData: MedicoDTO = {
            nomeMedico: 'Fernanda',
            especialidade: 'Cardiologista',
            crm: ' 00001-MG',
            expediente: {
                diasSemana: 'Segunda, Quarta, Sexta',
                horarioAntedimento: {
                    start: '10:00',
                    end: '20:00'
                }
            }   
        };

        medicosRepository.register(userData);
    })

    it('deve retornar uma lista de médicos disponíveis', async () => {
        const date =  new Date('05/07/2024T18:15')
        const medicos = await getAllMedicosUseCase.execute(date);
        expect(Array.isArray(medicos)).toBeTruthy();
        if (medicos.length > 0) {
            expect(medicos[0]).toHaveProperty('nome');
            expect(medicos[0]).toHaveProperty('CRM');
            expect(medicos[0]).toHaveProperty('especialidade');
        }
    })
})