import { TUser } from './users.interface'
import { User } from './users.model'

const createUserDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('User already exists!')
  }
  const result = await User.create(userData)
  return result
}

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
const getSingleUser = async (userId: string) => {
  const result = await User.findOne({ userId }).select({
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  })
  console.log(result)
  return result
}
const updateSingleUser = async (userId: string, updateData: TUser) => {
  const result = await User.updateOne({ userId }, { $set: updateData })
  return result
}
const deleteSingleUser = async (userId: string) => {
  const result = await User.deleteOne({ userId })
  return result
}

const updateASingleUsersOrders = async (userId: string, updateData: TUser) => {
  const result = await User.updateOne(
    { userId },
    { $push: { orders: updateData } },
  )
  console.log({ result })
  return result
}

const getSingleUserOrders = async (userId: string) => {
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
  console.log({ result })
  return result
}
const getSingleUserOrdersPrice = async (userId: string) => {
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

  const totalPrice = parseInt(result[0]?.totalPrice || 0)
  console.log({ totalPrice })
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
