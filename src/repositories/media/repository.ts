import Media from '@sequelize-models/Media'

import IMediaRepository from './interface'

export default class MediaRepository implements IMediaRepository {
    async create(item: object): Promise<void> {
        await Media.create(item)
    }
    async createAndReturn(item: object): Promise<Media> {
        return await Media.create(item)
    }
    async getById(id: string): Promise<Media> {
        return await Media.findOne({where:{id:id}})
    }

    update(id: string, item: Media): Promise<void> {
        throw new Error('Method not implemented.')
    }
    async remove(id: string): Promise<void> {
        await Media.destroy({where: {id: id}})
    }

    async getAllTravelMedia(travelid: string): Promise<Media[]> {
        return await Media.findAll({
            where: {travelId: travelid},
        })
    }
}
