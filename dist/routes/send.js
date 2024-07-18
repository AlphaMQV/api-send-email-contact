import { Router } from 'express';
import { SendController } from '../controllers/send.js';
import { SendModel } from '../models/send.js';
export const sendRouter = Router();
const sendController = new SendController({ model: new SendModel() });
sendRouter.post('/email', sendController.sendEmail);
