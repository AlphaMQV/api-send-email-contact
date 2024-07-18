import { type Request, type Response } from 'express'
import { type SendModel } from '../models/send'
import { sendEmailSchema } from '../schemas/send-email.schema'

export class SendController {
  model: SendModel

  constructor ({ model }: { model: SendModel }) {
    this.model = model
  }

  sendEmail = async (req: Request, res: Response) => {
    try {
      const requestBody = req.body
      // validar los datos
      const result = sendEmailSchema.safeParse(requestBody)
      // si no es valido
      if (!result.success) {
        res.status(400).json({ errors: result.error.errors })
        return
      }
      // si los datos son validos
      const data = await this.model.sendEmail(requestBody)
      // si devuelve status error
      if (data.status === 'error') {
        res.status(502).json({ ...data })
        return
      }
      // si el status es ok
      res.json({ message: 'Correo enviado satisfactoriamente' })
    } catch (_e) {
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  }
}
