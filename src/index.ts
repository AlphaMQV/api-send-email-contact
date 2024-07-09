import { appExpress } from './express.js'

const port = process.env.PORT ?? 80
appExpress.listen(port, () => { console.log(`Listen to port ${port}`) })
