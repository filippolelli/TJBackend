import {getUserService} from '@injection/services'
import IUserService from '@services/user/interface'
import {NextFunction, Request, Response} from 'express'
import {UniqueConstraintError} from 'sequelize'

export default class TravelController {
    private userService: IUserService

    constructor(userService = getUserService()) {
        this.get = this.get.bind(this)
        this.getAll = this.getAll.bind(this)
        this.create = this.create.bind(this)
        this.delete = this.delete.bind(this)
        this.update = this.update.bind(this)
        this.userService = userService
    }
    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.userService.getTravel(
                req.params.id as string,
                res.locals.loggedUserId
            )

            return res.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.userService.getAllTravels(
                res.locals.loggedUserId
            )

            return res.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            await this.userService.addTravel(req.body,res.locals.loggedUserId)

            return res.status(201).json('travel was added')
        } catch (err) {
            next(err)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            await this.userService.deleteTravel(
                req.params.id,
                res.locals.loggedUserId
            )
            return res.status(200).json('travel deleted')
        } catch (err) {
            next(err)
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            await this.userService.updateTravel(
                req.params.id,
                res.locals.loggedUserId,
                req.body
            )
            return res.status(200).json('travel updated')
        } catch (err) {
            next(err)
        }
    }
}
