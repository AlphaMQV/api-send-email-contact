import { sendEmailSchema } from '../schemas/send-email.schema.js';
export class SendController {
    constructor({ model }) {
        this.sendEmail = async (req, res) => {
            try {
                const requestBody = req.body;
                const result = sendEmailSchema.safeParse(requestBody);
                if (!result.success) {
                    res.status(400).json({ errors: result.error.errors });
                    return;
                }
                const data = await this.model.sendEmail(requestBody);
                if (data.status === 'error') {
                    res.status(502).json({ ...data });
                    return;
                }
                res.json({ message: 'Correo enviado satisfactoriamente' });
            }
            catch (_e) {
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        };
        this.model = model;
    }
}
