import cors from 'cors'
import express from 'express'
import { sendRouter } from './routes/send.js'

export const appExpress = express()

appExpress.disable('x-powered-by')

// const ACCEPTED_ORIGINS = ['https://landing-page-huaraz.vercel.app']

// const corsOptions: CorsOptions = {
//   origin: (origin, callback) => {
//     if (!origin || ACCEPTED_ORIGINS.includes(origin)) {
//       callback(null, true)
//       return
//     }
//     callback(new Error('Not allowed by CORS'))
//   },
//   optionsSuccessStatus: 200
// }

appExpress.use(express.json(), cors())

appExpress.use('/send', sendRouter)

appExpress.use((_, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' })
})
