import IBaseRepository from '@repositories/base-interface'

import Media from '@sequelize-models/Media'

export default interface IMediaRepository extends IBaseRepository<Media> {
    getAllTravelMedia(travelid: string): Promise<Media[]>
    
}
