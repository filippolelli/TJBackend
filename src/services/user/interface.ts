import Travel from '@sequelize-models/Travel'

export default interface IUserService {
    getTravel(travelid: string, loggedUserId: string): Promise<Travel>
    updateTravel(
        travelid: string,
        loggedUserId: string,
        params: any
    ): Promise<void>
    deleteTravel(travelid: string, loggedUserId: string): Promise<void>
    getAllTravels(loggedUserId: string): Promise<Travel[]>
    addTravel(travelDatas:object, loggedUserId:string): Promise<void>
}
