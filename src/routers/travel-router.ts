import express from 'express'

import TravelController from '@controllers/travel-controller'

import {body, param} from 'express-validator'
import { validate, validateCities } from '@lib/middleware/validate'


const router = express.Router()
const controller = new TravelController()

router.post(
    '/',
    body('cities').isArray(),
    body('cities.*.name').isString(),
    body('cities.*.country').isString().isLength({min:2,max:2}),
    body('cities').custom(validateCities),
    body('start').isDate(),
    body('end').isDate(),
    validate('body'),
    controller.create
)
router.get('/id/:id', param('id').isUUID(), validate('params'), controller.get)
router.get('/', controller.getAll)
router.delete(
    '/:id',
    param('id').isUUID(),
    validate('params'),
    controller.delete
)
router.patch(
    '/:id',
    param('id').isUUID(),
    validate('params'),
    body('start').isDate().optional(),
    body('end').isDate().optional(),
    body('cities').isArray().optional(),
    body('cities.*.name').isString().optional(),
    body('cities.*.country').isString().isLength({min:2,max:2}).optional(),
    body('cities').custom(validateCities).optional(),
    validate('body'),
    controller.update
)

export default router
