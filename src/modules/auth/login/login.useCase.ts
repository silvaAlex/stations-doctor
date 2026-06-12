import { prismaClient } from '../../../../prisma/prismaClient'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AppError } from '../../../errors/AppError'

export class LoginUseCase {
    async execute({ email, password }: any) {
        const admin = await prismaClient.admin.findUnique({
            where: { email }
        })

        if (!admin) {
            throw new AppError('Email ou senha incorretos')
        }

        const isValidPassword = await bcrypt.compare(password, admin.password)

        if (!isValidPassword) {
            throw new AppError('Email ou senha incorretos')
        }

        const secret = process.env.JWT_SECRET || 'secret'
        const token = jwt.sign({ id: admin.id }, secret, {
            expiresIn: '1d'
        })

        return token
    }
}
