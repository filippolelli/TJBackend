import ApplicationError from './application-error'

export default class NotFoundError extends ApplicationError {
    status: number
    constructor(message: string) {
        super(message)
        this.status = 404
    }
}
