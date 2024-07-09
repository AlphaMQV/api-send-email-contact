import cors, { type CorsOptions } from 'cors'
import express from 'express'
import { sendRouter } from './routes/send.js'

export const appExpress = express()

appExpress.disable('x-powered-by')

const corsOptions: CorsOptions = {
  origin: 'https://landing-page-huaraz.vercel.app',
  optionsSuccessStatus: 200
}

appExpress.use(express.json(), cors(corsOptions))

appExpress.use('/send', sendRouter)

appExpress.use((_, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' })
})
