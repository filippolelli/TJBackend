import NotFoundError from '@lib/errors/not-found'
import UnauthorizedError from '@lib/errors/unathorized'
import {getTravelRepository} from '@injection/repositories'
import ITravelRepository from '@repositories/travel/interface'
import Travel from '@sequelize-models/Travel'

import IUserService from './interface'
import { getMediaService } from '@injection/services'
import IMediaService from '@services/media/interface'

export default class UserService implements IUserService {
    private travelRepository: ITravelRepository

    private mediaService:IMediaService
    constructor(travelRepository = getTravelRepository(),mediaService=getMediaService()) {
        this.travelRepository = travelRepository
        this.mediaService=mediaService
    }
    async addTravel(travelDatas: any,loggedUserId:string): Promise<void> {
        travelDatas.owner=loggedUserId
        await this.travelRepository.create(travelDatas)
    }

    async getTravel(travelid: string, loggedUserId: string): Promise<Travel> {
        const trav = await this.travelRepository.getById(travelid)
        if (!trav) throw new NotFoundError('Travel not found')

        if (trav.getOwner() !== loggedUserId)
            throw new UnauthorizedError('Unauthorized access to travel')
        return trav
    }

    async getAllTravels(loggedUserId: string): Promise<Travel[]> {
        const travs = await this.travelRepository.getAll(loggedUserId)
        if (!travs) throw new NotFoundError('Travel not found')
        return travs
    }
    async updateTravel(
        travelid: string,
        loggedUserId: string,
        params: any
    ): Promise<void> {
        
        await this.getTravel(travelid, loggedUserId)
        await this.travelRepository.update(travelid, params)
    }
    async deleteTravel(travelid: string, loggedUserId: string): Promise<void> {
        const promises= new Array()
        const travel=await this.getTravel(travelid, loggedUserId)
        for(let i:number=0;i<travel.media.length;i+=1){
            promises.push(this.mediaService.delete(travel.media[i].getId(),loggedUserId))
        }
        promises.push(this.travelRepository.remove(travelid))
        await Promise.all(promises)
        
    }
}
