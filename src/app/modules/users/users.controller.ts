import { Request, Response } from 'express'
import { UserServices } from './users.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body
    const result = await UserServices.createUserDB(user)
    res.status(200).json({
      success: true,
      message: 'user create successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    })
  }
}
export const UserController = {
  createUser,
}
