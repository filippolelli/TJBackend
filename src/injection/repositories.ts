import IMediaRepository from '@repositories/media/interface'
import MediaRepository from '@repositories/media/repository'
import ITravelRepository from '@repositories/travel/interface'
import TravelRepository from '@repositories/travel/repository'
import IUserRepository from '@repositories/user/interface'
import UserRepository from '@repositories/user/repository'

export function getUserRepository(): IUserRepository {
    return new UserRepository()
}

export function getTravelRepository(): ITravelRepository {
    return new TravelRepository()
}

export function getMediaRepository(): IMediaRepository {
    return new MediaRepository()
}
