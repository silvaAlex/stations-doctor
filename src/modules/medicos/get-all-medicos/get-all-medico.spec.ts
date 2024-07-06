import { MedicoDTO } from "../../../DTOs/Medico";
import { IMedicoRepository } from "../../../infra/repository/medicos/IMedico.Repository";
import { MockMedicoRepository } from "../../../infra/repository/medicos/MockMedico.Repository";
import { GetAllMedicosUseCase } from "./get-all-medico.useCase";


describe('GET Medico UseCase', () => {
    let getAllMedicosUseCase: GetAllMedicosUseCase;
    let mockMedicosRepository: IMedicoRepository;

    beforeAll(async () => {
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
                    end: '20:00'
                }
            }   
        };

        await mockMedicosRepository.register(userData);
    })

    it('deve retornar uma lista de médicos disponíveis', async () => {
        const date =  new Date('2024-07-08T10:15:00Z')

        const medicos = await getAllMedicosUseCase.execute(date)

        expect(Array.isArray(medicos)).toBeTruthy();
        if (medicos.length > 0) {
            expect(medicos[0]).toHaveProperty('nomeMedico');
            expect(medicos[0]).toHaveProperty('crm');
            expect(medicos[0]).toHaveProperty('especialidade');
        }
    })
})