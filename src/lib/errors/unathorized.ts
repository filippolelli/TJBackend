import ApplicationError from './application-error'

export default class UnauthorizedError extends ApplicationError {
    status: number
    constructor(message: string) {
        super(message)
        this.status = 401
    }
}
