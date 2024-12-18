import { z } from 'zod'

export const sendEmailSchema = z.object({
  names: z.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(255, 'El nombre debe tener como máximo 255 caracteres'),
  phone: z.string()
    .regex(/^(\+\d+ )?(\(\d+( \d+)*\) )?\d+( \d+)*$/, 'El número de teléfono no es válido')
})
