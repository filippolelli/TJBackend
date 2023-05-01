import ApplicationError from '@lib/errors/application-error'
import {NextFunction, Request, Response} from 'express'

export default function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof ApplicationError)
        res.status(err.status).json(err.message)
    else {
        Error.captureStackTrace(err)
        console.error(err.stack)
        res.status(500).json('server error')
    }
}
