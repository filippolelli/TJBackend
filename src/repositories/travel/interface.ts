import IBaseRepository from '@repositories/base-interface'
import Travel from '@sequelize-models/Travel'

export default interface ITravelRepository extends IBaseRepository<Travel> {
    getAll(loggedUserId: string): Promise<Travel[]>
}
