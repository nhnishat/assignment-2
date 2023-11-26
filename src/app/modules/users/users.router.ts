import express from 'express'
import { UserController } from './users.controller'

const router = express.Router()

router.post('/users', UserController.createUser)
router.get('/users', UserController.allUser)
router.get('/users/:userId', UserController.SingleUser)
router.put('/users/:userId', UserController.updateSingleUser)
router.delete('/users/:userId', UserController.deleteSingleUser)

export const UserRouter = router
