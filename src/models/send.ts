import { Resend } from 'resend'
import { API_KEY_RESEND, EMAIL_RECEIVE } from '../core/config'
import { type ReceivedDataI, type SendDataI, type SendEmailResponseI } from '../interfaces/send-email'
import { dateFormat } from '../libs/date-format'

class SendModel {
  private readonly resend = new Resend(API_KEY_RESEND)
  private readonly emailReceive = EMAIL_RECEIVE

  private formatMessage(data: ReceivedDataI): SendDataI {
    return {
      ...data,
      datetime: dateFormat(new Date())
    }
  }

  sendEmail = async (requestBody: ReceivedDataI): Promise<SendEmailResponseI> => {
    try {
      const { client: { names, email } } = requestBody
      if (!names || !email) {
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
          <p><strong>Origen de Paquete:</strong> ${message.origin}</p>
          <p><strong>Nombres:</strong> ${message.client.names}</p>
          <p><strong>Correo:</strong> ${message.client.email}</p>
          <p><strong>Fecha:</strong> ${message.datetime}</p>
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
