import { User } from './users.interface'
import { UserModel } from './users.model'

const createUserDB = async (user: User) => {
  const result = await UserModel.create(user)
  return result
}

export const UserServices = {
  createUserDB,
}
