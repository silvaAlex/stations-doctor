import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido' })
    }

    const [, token] = authHeader.split(' ')

    try {
        const secret = process.env.JWT_SECRET || 'secret'
        const decoded = jwt.verify(token, secret)
        
        // Pass decoded info to request if needed
        ;(req as any).user = decoded
        return next()
    } catch (err) {
        return res.status(401).json({ error: 'Token inválido' })
    }
}
