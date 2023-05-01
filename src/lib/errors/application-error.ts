export default class ApplicationError extends Error {
    status: number
    constructor(message: string) {
        super()

        Error.captureStackTrace(this, this.constructor)

        this.name = this.constructor.name

        this.message = message || 'Something went wrong. Please try again.'
    }
}
