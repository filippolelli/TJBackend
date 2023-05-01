import logger from 'morgan'
import express from 'express'
import cors from 'cors'
import passport from 'passport'

import sequelizeConn from './sequelize-conn'
import JWTStrategy from './lib/auth/jwt-strategy'
import authorize from '@lib/middleware/authorize'
import errorHandler from '@lib/middleware/error-handler'
import authRouter from '@routers/auth-router'
import registerRouter from '@routers/register-router'
import travelRouter from '@routers/travel-router'
import mediaRouter from '@routers/media-router'
import multer from 'multer'
import printRequest from '@lib/middleware/print-req'

const upload=multer()
sequelizeConn
    .sync({force: false})
    .catch((err) => {
        console.log(err)
    })

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: true}))

passport.use(JWTStrategy)

app.use('/api/auth', printRequest,authRouter)
app.use('/api/registration', registerRouter)
app.use('/api/travel', authorize,travelRouter)
app.use('/api/media', authorize, upload.single('buffer') ,mediaRouter);

app.use(errorHandler)
export default app


