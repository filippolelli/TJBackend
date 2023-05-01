import {generateSaltandHash} from '@lib/auth/password'
import ConflictError from '@lib/errors/conflict'
import User from '@sequelize-models/User'
import IUserRepository from './interface'
import {UniqueConstraintError} from 'sequelize'

export default class UserRepository implements IUserRepository {
    async update(id: string, item: User): Promise<void> {
        await User.update(item, {where: {id: id}})
    }
    async remove(id: string): Promise<void> {
        await User.destroy({where: {id: id}})
    }
    async create(params: any): Promise<void> {
        const {salt, hash} = generateSaltandHash(params.password)
        params.hash = hash
        params.salt = salt
        try {
            await User.create(params)
        } catch (err) {
            if (err instanceof UniqueConstraintError)
                throw new ConflictError('email already registered')
        }
    }
    async getByEmail(email: string): Promise<User> {
        return await User.findOne({where: {email: email}})
    }
    async getById(id: string): Promise<User> {
        return await User.findOne({where: {id: id}})
    }
}
