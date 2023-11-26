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

export const UserServices = {
  createUserDB,
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
  updateSingleUser,
}
