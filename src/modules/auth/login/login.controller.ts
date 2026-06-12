import { Request, Response } from 'express'
import { LoginUseCase } from './login.useCase'

export class LoginController {
    constructor(private loginUseCase: LoginUseCase) {}

    async handle(req: Request, res: Response) {
        const { email, password } = req.body

        try {
            const token = await this.loginUseCase.execute({ email, password })
            return res.status(200).json({ token })
        } catch (error: any) {
            return res.status(401).json({ error: error.message })
        }
    }
}
