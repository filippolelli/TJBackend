import RegisterController from '@controllers/register-controller'
import {validate} from '@lib/middleware/validate'
import express from 'express'
import {body} from 'express-validator'

const router = express.Router()
const controller = new RegisterController()

router.post(
    '/',
    body('name'),
    body('surname'),
    body('email').isEmail(),
    body('password'),
    validate('body'),
    controller.register
)

export default router
