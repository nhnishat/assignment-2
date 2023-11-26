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

const allUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsers()
    res.status(200).json({
      success: true,
      message: 'user retrieved successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      data: error,
    })
  }
}

const SingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await UserServices.getSingleUser(userId)
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
    }
    res.status(200).json({
      success: true,
      message: 'user retrieved  successfully',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: error,
    })
  }
}
const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await UserServices.deleteSingleUser(userId)
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
    }
    res.status(200).json({
      success: true,
      message: 'user delete  successfully',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: error,
    })
  }
}
const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const updateData = req.body
    const result = await UserServices.updateSingleUser(userId, updateData)
    res.status(200).json({
      success: true,
      message: 'user Update successfully',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: 'fail',
      message: 'something went wrong',
      error: error,
    })
  }
}
export const UserController = {
  createUser,
  allUser,
  SingleUser,
  deleteSingleUser,
  updateSingleUser,
}
