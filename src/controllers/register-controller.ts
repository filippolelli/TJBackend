import {getRegisterService} from '@injection/services'
import IRegisterService from '@services/register/interface'
import {NextFunction, Request, Response} from 'express'

export default class RegisterController {
    private registerService: IRegisterService

    constructor(registerService = getRegisterService()) {
        this.register = this.register.bind(this)
        this.registerService = registerService
    }

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            //body check
            await this.registerService.register(req.body)
            return res.status(201).json('User saved')
        } catch (err) {
            next(err)
        }
    }
}
