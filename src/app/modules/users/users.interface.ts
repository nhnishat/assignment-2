import { Model } from 'mongoose'

export type TFullName = {
  firstName: string
  lastName: string
}
export type TAddress = {
  street: string
  city: string
  country: string
}

export type TOrder = {
  productName: string
  price: number
  quantity: number
}

export type TUser = {
  userId: string
  username: string
  password: string
  fullName: TFullName
  age: string
  email: string
  isActive: boolean
  hobbies: [string, string]
  address: TAddress
  orders: TOrder
}

export interface UserModel extends Model<TUser> {
  isUserExists(userId: string): Promise<TUser | null>
}
