import { TUser } from './users.interface'
import { User } from './users.model'

const createUserDB = async (userData: TUser) => {
  const user = new User(userData)
  if (await user.isUserExists(userData.userId)) {
    throw new Error('User already exists!')
  }
  const result = await user.save()
  return result
}

const getAllUsers = async (userData: TUser) => {
  const result = await User.find(userData)
  return result
}

export const UserServices = {
  createUserDB,
  getAllUsers,
}
