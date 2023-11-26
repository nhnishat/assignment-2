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
  const result = await User.find()
  return result
}
const getSingleUser = async (userId: string) => {
  const result = await User.findOne({ userId })
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
