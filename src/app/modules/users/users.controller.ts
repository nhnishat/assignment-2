import { Request, Response } from 'express'
import { UserServices } from './users.service'

// Create a new user
const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body
    const result = await UserServices.createUserDB(user)
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    })
  }
}

// Get all users
const allUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsers()
    res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      data: error,
    })
  }
}
// Get a single user by userId
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
      message: 'User retrieved successfully',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    })
  }
}
// Delete a single user by userId
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
      message: 'User deleted successfully',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    })
  }
}

// Update a single user by userId
const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const updateData = req.body
    const result = await UserServices.updateSingleUser(userId, updateData)
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    })
  }
}

// Update a single user's orders by userId
const updateSingleUsersOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    const updateData = req.body
    console.log(userId, updateData)
    const result = await UserServices.updateASingleUsersOrders(
      userId,
      updateData,
    )
    res.status(200).json({
      success: true,
      message: 'Order added successfully',
      data: result,
    })
  } catch (error) {
    res.status(200).json({
      success: false,
      message: 'Something is wrong',
      data: null,
    })
  }
}

// Get a single user's orders by userId
const SingleUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await UserServices.getSingleUserOrders(userId)
    res.status(200).json({
      success: true,
      message: 'User orders retrieved successfully',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    })
  }
}

// Get the total price of a single user's orders by userId
const SingleUserOrdersPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await UserServices.getSingleUserOrdersPrice(userId)
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice: result,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
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
  updateSingleUsersOrders,
  SingleUserOrders,
  SingleUserOrdersPrice,
}
