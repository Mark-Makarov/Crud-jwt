import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { createServer } from 'http'
import { router } from './router/index.js'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware.js'
import { pg } from './db/index.js'

dotenv.config()

const PORT = process.env.SERVER_PORT || 8080

const app = express()

const middleware = [cors(), express.json(), cookieParser()]

app.use(middleware)
app.use('/api/v1', router)
app.disable('x-powered-by')

const server = createServer(app)

app.use(errorHandlingMiddleware)
const start = async () => {
  try {
    await pg.authenticate()
    await pg.sync()
    server.listen(PORT, () => {
      console.log(`server start on port: ${PORT}`)
    })
  } catch (e) {
    console.log(`server error: ${e}`)
  }
}

await start()
