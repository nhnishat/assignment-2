import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import { UserRouter } from './app/modules/users/users.router'
const app: Application = express()

app.use(express.json())
app.use(cors())

app.use('/api', UserRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello developers!')
})
export default app
