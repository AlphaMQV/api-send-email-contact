import 'dotenv/config';
import { Resend } from 'resend';
export class SendModel {
    constructor() {
        this.resend = new Resend(process.env.API_KEY_RESEND);
        this.sendEmail = async (requestBody) => {
            try {
                const { names, phone, email } = requestBody;
                if (!names || !phone || !email) {
                    return {
                        status: 'error',
                        message: 'Campos inválidos'
                    };
                }
                await this.resend.emails.send({
                    from: 'onboarding@resend.dev',
                    to: ['jack28jaramillo@gmail.com'],
                    subject: 'Hello World',
                    html: `<p>Congrats on sending your <strong>first email</strong>!</p><p>data: ${JSON.stringify(requestBody)}</p>`
                });
                return {
                    status: 'ok',
                    message: 'Correo enviado correctamente'
                };
            }
            catch (error) {
                return {
                    status: 'error',
                    message: 'No se pudo enviar el correo',
                    error
                };
            }
        };
    }
}
