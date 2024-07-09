import cors from 'cors'
import express from 'express'
import { sendRouter } from './routes/send.js'

export const appExpress = express()

appExpress.disable('x-powered-by')

// Lista de orígenes permitidos
const allowedOrigins = ['https://qaalphamqv.vercel.app', 'https://uatalphamqv.vercel.app', 'https://alphamqv.vercel.app']

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin)) {
      // Permitir el origen si está en la lista
      callback(null, true)
    } else {
      // Rechazar el origen si no está en la lista
      callback(new Error('Not allowed by CORS'))
    }
  }
}

appExpress.use(express.json(), cors(corsOptions))

appExpress.use('/send', sendRouter)

appExpress.use((_, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' })
})
