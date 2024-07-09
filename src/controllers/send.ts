import { type SendModel } from '../models/send.js'
import { sendEmailSchema } from '../schemas/send-email.schema.js'

export class SendController {
  model: SendModel

  constructor ({ model }) {
    this.model = model
  }

  sendEmail = async (req, res) => {
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
