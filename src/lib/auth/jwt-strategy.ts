import UserRepository from '@repositories/user/repository'
import dotenv from 'dotenv'
import passportJWT from 'passport-jwt'
dotenv.config()

const userRepository = new UserRepository()
const {Strategy: JWTStrategy, ExtractJwt: ExtractJWT} = passportJWT

const opts: passportJWT.StrategyOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWTSECRET,
    passReqToCallback: true,
}

export default new JWTStrategy(opts, async (req, jwtPayload, done) => {
    try {
        const user = await userRepository.getByEmail(jwtPayload.email)
        if (user) return done(null, user)
        else {
            return done(null, false, {
                message: 'Not authorized',
                status: 401,
            })
        }
    } catch (err) {
        return done(err)
    }
})
