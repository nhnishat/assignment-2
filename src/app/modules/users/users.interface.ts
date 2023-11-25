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

export type TUser = {
  userId: number
  username: string
  password: string
  fullName: TFullName
  age: string
  email: string
  isActive: boolean
  hobbies: [string, string]
  address: TAddress
}

export interface UserMethods {
  isUserExists(userId: number): Promise<TUser | null>
}
export type UserModel = Model<TUser, Record<string, never>, UserMethods>
