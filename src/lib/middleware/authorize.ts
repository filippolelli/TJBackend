import passport from 'passport'
import {NextFunction, Request, Response} from 'express'

function authorize(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('jwt', {session: false}, (err, user, _info) => {
        if (err || !user) {
            return res.status(401).json({
                message:
                    'Unauthorized! You must be logged in to access this resource',
            }) // send the error response to client
        }
        res.locals.loggedUserId = user.id
        
        next() // continue to next middleware if no error.
    })(req, res, next)
}

export default authorize
