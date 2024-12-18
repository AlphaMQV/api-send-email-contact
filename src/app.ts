import cors, { type CorsOptions } from 'cors'
import express, { type Request, type Response } from 'express'
import sendRouter from './routes/send'

const app = express()

app.disable('x-powered-by')

const ACCEPTED_ORIGINS = ['https://landing-page-huaraz.vercel.app', 'https://paquetes.masquevacaciones.com.pe']

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

const port = process.env.PORT ?? 80

app.listen(port, () => { console.log(`Listen to port ${port}`) })

export default app
