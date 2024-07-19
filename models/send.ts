import 'dotenv/config'
import { Resend } from 'resend'
import { type ReceivedDataI, type SendDataI, type SendEmailResponseI } from '../interfaces/send-email'

class SendModel {
  private readonly resend = new Resend(process.env.API_KEY_RESEND)
  private readonly emailReceive = process.env.EMAIL_RECEIVE ?? 'base@correo.com'

  private formatMessage (data: ReceivedDataI): SendDataI {
    return {
      ...data,
      datetime: new Date().toString()
    }
  }

  sendEmail = async (requestBody: ReceivedDataI): Promise<SendEmailResponseI> => {
    try {
      const { client: { names, phone } } = requestBody
      if (!names || !phone) {
        return {
          status: 'error',
          message: 'Campos inválidos'
        }
      }
      const message = this.formatMessage(requestBody)
      await this.resend.emails.send({
        from: 'onboarding@resend.dev',
        to: [this.emailReceive],
        subject: `Contacto de Cliente: ${message.origin}`,
        html: `
          <h1>Contacto de Cliente</h1>
          <p><strong>Origen:</strong> ${message.origin}</p>
          <p><strong>Nombres:</strong> ${message.client.names}</p>
          <p><strong>Teléfono:</strong> ${message.client.phone}</p>
          <p>data: ${JSON.stringify(message)}</p>
        `
      })
      return {
        status: 'ok',
        message: 'Correo enviado correctamente'
      }
    } catch (error) {
      return {
        status: 'error',
        message: 'No se pudo enviar el correo',
        error
      }
    }
  }
}

export default SendModel
