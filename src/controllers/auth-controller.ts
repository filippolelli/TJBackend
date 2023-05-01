import {getAuthService} from '@injection/services'
import IAuthService from '@services/auth/interface'
import {NextFunction, Response, Request} from 'express'

export default class AuthController {
    private authService: IAuthService

    constructor(authService = getAuthService()) {
        this.login = this.login.bind(this)
        this.authService = authService
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            
            const token = await this.authService.authenticate(req.body)
            return res.status(200).json({jwt: token})
        } catch (err) {
            next(err)
        }
    }
}
