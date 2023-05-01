import MediaController from '@controllers/media-controller'
import express from 'express'
import { body } from 'express-validator'

const router = express.Router()
const controller = new MediaController()

router.post('/', controller.upload)
router.get('/:id',body('id').isUUID(), controller.get)
router.delete('/:id',body('id').isUUID(), controller.delete)
export default router
