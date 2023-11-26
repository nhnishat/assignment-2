import express from 'express'
import { UserController } from './users.controller'

const router = express.Router()

router.post('/users', UserController.createUser)
router.get('/users', UserController.getUser)

export const UserRouter = router
