import cors, { type CorsOptions } from 'cors'
import express, { type Request, type Response } from 'express'
import { ACCEPTED_ORIGINS, PORT } from './core/config'
import sendRouter from './routes/send'

const app = express()

app.disable('x-powered-by')

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || ACCEPTED_ORIGINS.includes(origin)) {
      callback(null, true)
      return
    }
    callback(new Error('Not allowed by CORS'))
  },
  optionsSuccessStatus: 200
}

app.use(express.json())
app.use(cors(corsOptions))

app.get('/', (_req: Request, res: Response) => {
  res.send('API send email corporative')
})

app.use('/send', sendRouter)

app.use((_, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' })
})

app.listen(PORT, () => { console.log(`Listen to port ${PORT}`) })

export default app
