import Travel from '@sequelize-models/Travel'

import ITravelRepository from './interface'
import Media from '@sequelize-models/Media'
export default class TravelRepository implements ITravelRepository {
    async create(travel: Travel): Promise<void> {
            await Travel.create(travel)
        
    }

    async getAll(loggedUserId: string): Promise<Travel[]> {
        return await Travel.findAll({where: {owner: loggedUserId}})
    }
    async remove(id: string): Promise<void> {
        await Travel.destroy({where: {id: id}, individualHooks: true})
    }
    async update(id: string, travel: Travel): Promise<void> {
        await Travel.update(travel, {where: {id: id}, individualHooks: true})
    }

    async getById(id: string): Promise<Travel> {
        return await Travel.findOne({
            where: {id: id},
            include: {model: Media, as: 'media'},
        })
    }
}
