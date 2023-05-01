export default interface IMediaService {
    upload(
        travelid: string,
        file: Express.Multer.File,
        loggedUserId: string
    ): Promise<void>
    get(id: string, loggedUserId: string): Promise<string>
    delete(id: string, loggedUserId: string): Promise<void>
}
