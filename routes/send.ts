import { Router } from 'express'
import { SendController } from '../controllers/send'
import { SendModel } from '../models/send'

const sendRouter = Router()

const sendController = new SendController({ model: new SendModel() })

sendRouter.post('/email', sendController.sendEmail)

export default sendRouter
