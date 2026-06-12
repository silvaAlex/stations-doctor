import { LoginController } from './login.controller'
import { LoginUseCase } from './login.useCase'

export const loginFactory = () => {
    const loginUseCase = new LoginUseCase()
    const loginController = new LoginController(loginUseCase)
    return loginController
}
