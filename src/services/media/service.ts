import {getMediaRepository, getTravelRepository} from '@injection/repositories'
import IMediaRepository from '@repositories/media/interface'

import {v4 as uuidv4} from 'uuid'
import s3 from '@s3-conn'
import IMediaService from './interface'
import sharp from 'sharp'
import UnauthorizedError from '@lib/errors/unathorized'
import NotFoundError from '@lib/errors/not-found'
import ITravelRepository from '@repositories/travel/interface'

export default class MediaService implements IMediaService {
    private mediaRepository: IMediaRepository
    private travelRepository: ITravelRepository

    constructor(
        mediaRepository = getMediaRepository(),
        travelRepository = getTravelRepository()
    ) {
        this.mediaRepository = mediaRepository
        this.travelRepository = travelRepository
    }
    async delete(id: string, loggedUserId: string): Promise<void> {
        const media = await this.mediaRepository.getById(id)
        if (!media) throw new NotFoundError('Media not found')
        if (loggedUserId !== media.getOwner())
            throw new UnauthorizedError('Unauthorized access to media')
        await this.mediaRepository.remove(id)
        const thumbnailKey = media.getThumbnailKey()
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Delete: {
                Objects: [
                    {
                        Key: media.getKey(),
                    },
                    {
                        Key: thumbnailKey,
                    },
                ],
                Quiet: false,
            },
        }
        await s3.deleteObjects(params).promise()
    }
    async upload(
        travelid: string,
        file: Express.Multer.File,
        loggedUserId: string
    ): Promise<void> {
        const trav = await this.travelRepository.getById(travelid)
        if (!trav) throw new NotFoundError('Travel not found')

        if (trav.getOwner() !== loggedUserId)
            throw new UnauthorizedError('Unauthorized access to travel')

        const imageKey = `${loggedUserId}/${travelid}/${uuidv4()}`
        const thumbnailKey = `${loggedUserId}/${travelid}/thumbnails/${uuidv4()}`
        const s3Promises = new Array()

        const uploadImage = s3
            .upload({
                Bucket: process.env.S3_BUCKET_NAME,
                ContentType: file.mimetype,
                Key: imageKey,
                Body: file.buffer,
            })
            .promise()
        const thumbnail = await sharp(file.buffer).resize(200).toBuffer()

        const uploadThumbnail = s3
            .upload({
                Bucket: process.env.S3_BUCKET_NAME,
                ContentType: file.mimetype,
                Key: thumbnailKey,
                Body: thumbnail,
            })
            .promise()
        s3Promises.push(uploadImage, uploadThumbnail)
        const media: any = {
            travelId: travelid,
            bucket: process.env.S3_BUCKET_NAME,
            key: imageKey,
            thumbnailKey: thumbnailKey,
            owner: loggedUserId,
            buffer: file.buffer,
            thumbnailBuffer: thumbnail,
            mimetype: file.mimetype,
        }
        await Promise.all(s3Promises)
        await this.mediaRepository.create(media)
    }

    async get(id: string, loggedUserId: string): Promise<string> {
        const media = await this.mediaRepository.getById(id)

        if (!media) throw new NotFoundError('Media not found')
        if (loggedUserId !== media.getOwner())
            throw new UnauthorizedError('Unauthorized access to media')

        const params = {
            Key: media.getKey(),
            Expires: 3600,
            Bucket: process.env.S3_BUCKET_NAME,
        }
        return await s3.getSignedUrlPromise('getObject', params)
    }
}
