import {getUserRepository} from '@injection/repositories'
import IUserRepository from '@repositories/user/interface'
import User from '@sequelize-models/User'
import IRegisterService from './interface'

export default class RegisterService implements IRegisterService {
    private userRepository: IUserRepository

    constructor(userRepository = getUserRepository()) {
        this.userRepository = userRepository
    }
    async register(params: User): Promise<void> {
        await this.userRepository.create(params)
    }
}
