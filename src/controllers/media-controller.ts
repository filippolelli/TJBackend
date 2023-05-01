import {getMediaService} from '@injection/services'
import IMediaService from '@services/media/interface'

import {NextFunction, Request, Response} from 'express'

export default class MediaController {
    private mediaService: IMediaService

    constructor(mediaService = getMediaService()) {
        this.mediaService = mediaService
        this.upload = this.upload.bind(this)
        this.get = this.get.bind(this)
        this.delete = this.delete.bind(this)
    }

    async upload(req: Request, res: Response, next: NextFunction) {
        try {
            await this.mediaService.upload(
                req.body.travelid,
                req.file,
                res.locals.loggedUserId
            )

            return res.status(201).json('Media uploaded')
        } catch (err) {
            next(err)
        }
    }
    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const signedUrl = await this.mediaService.get(
                req.params.id as string,
                res.locals.loggedUserId
            )
            return res.status(200).json(signedUrl)
        } catch (err) {
            next(err)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            await this.mediaService.delete(
                req.params.id as string,
                res.locals.loggedUserId
            )
            return res.status(200).json('media deleted')
        } catch (err) {
            next(err)
        }
    }
}
