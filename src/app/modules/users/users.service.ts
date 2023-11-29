import { TUser } from './users.interface'
import { User } from './users.model'

// Create a new user

const createUserDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId.toString())) {
    throw new Error('User already exists!')
  }
  const result = await User.create(userData)
  return result
}

// Get all users

const getAllUsers = async () => {
  const result = await User.find().select({
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  })
  return result
}

// Get a single user by userId

const getSingleUser = async (userId: number) => {
  const result = await User.findOne({ userId }).select({
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  })
  return result
}

// Update a single user by userId
const updateSingleUser = async (userId: number, updateData: TUser) => {
  const result = await User.updateOne({ userId }, { $set: updateData })
  return result.modifiedCount > 0 ? result : null
}

// Delete a single user by userId
const deleteSingleUser = async (userId: number) => {
  const result = await User.deleteOne({ userId })
  return result
}

// Update a single user's orders by userId

const updateASingleUsersOrders = async (userId: number, updateData: TUser) => {
  const result = await User.updateOne(
    { userId },
    { $push: { orders: updateData } },
  )
  return result
}

// Get a single user's orders by userId

const getSingleUserOrders = async (userId: number) => {
  const result = await User.aggregate([
    {
      $match: {
        userId: userId,
      },
    },
    {
      $project: {
        orders: {
          productName: 1,
          price: 1,
          quantity: 1,
        },
      },
    },
  ])
  return result
}

// Get the total price of a single user's orders by userId
const getSingleUserOrdersPrice = async (userId: number) => {
  const result = await User.aggregate([
    {
      $match: {
        userId: userId,
      },
    },
    {
      $unwind: '$orders',
    },
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalPrice: 1,
      },
    },
  ])

  const totalPrice = parseInt(result[0]?.totalPrice || null)
  return totalPrice
}

export const UserServices = {
  createUserDB,
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
  updateSingleUser,
  updateASingleUsersOrders,
  getSingleUserOrders,
  getSingleUserOrdersPrice,
}
