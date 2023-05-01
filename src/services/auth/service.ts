import NotFoundError from '@lib/errors/not-found'
import UnauthorizedError from '@lib/errors/unathorized'
import {getUserRepository} from '@injection/repositories'
import {passwordValid} from '@lib/auth/password'
import {generateJwt} from '@lib/auth/token'
import IUserRepository from '@repositories/user/interface'
import IAuthService from './interface'

export default class AuthService implements IAuthService {
    private userRepository: IUserRepository

    constructor(userRepository = getUserRepository()) {
        this.userRepository = userRepository
    }
    async authenticate({email, password}): Promise<string> {
        const user = await this.userRepository.getByEmail(email)
        if (!user) throw new NotFoundError('Email not registered')

        if (!passwordValid(user, password)) {
            throw new UnauthorizedError('Wrong Password')
        }

        return generateJwt(user)
    }
}
