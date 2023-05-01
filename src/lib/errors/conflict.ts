import ApplicationError from './application-error'

export default class ConflictError extends ApplicationError {
    status: number
    constructor(message: string) {
        super(message)
        this.status = 409
    }
}
