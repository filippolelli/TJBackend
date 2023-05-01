import AuthController from '@controllers/auth-controller'
import {validate} from '@lib/middleware/validate'
import express from 'express'
import {body} from 'express-validator'

const router = express.Router()
const controller = new AuthController()

router.post(
    '/',
    body('email').isEmail(),
    body('password'),
    validate('body'),
    controller.login
)

export default router
