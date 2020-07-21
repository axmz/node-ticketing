import {Request, Response, NextFunction} from 'express'
import { NotAuthorizedError } from '../errors/not-authorized-error'

export const requireAuth = function(req: Request, res: Response, next: NextFunction) {
    if (!req.currentUser) {
        throw new NotAuthorizedError()
    }

    next()
}