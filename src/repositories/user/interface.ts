import IBaseRepository from '@repositories/base-interface'
import User from '@sequelize-models/User'

export default interface IUserRepository extends IBaseRepository<User> {
    getByEmail(email: string): Promise<User>
}
