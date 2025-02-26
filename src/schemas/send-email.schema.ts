import { z } from 'zod'

export const sendEmailSchema = z.object({
  names: z.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(255, 'El nombre debe tener como máximo 255 caracteres'),
  email: z.string()
    .regex(/^[\w\.]+@([\w-]+\.)+[\w]{2,4}$/, 'El correo no es válido')
})
