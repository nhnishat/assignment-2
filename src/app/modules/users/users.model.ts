import { Schema, model } from 'mongoose'
import {
  TAddress,
  TFullName,
  TUser,
  UserMethods,
  UserModel,
} from './users.interface'
const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
})
const addressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
})
const UserSchema = new Schema<TUser, UserModel, UserMethods>({
  userId: { type: Number, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: fullNameSchema,
  age: { type: String, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: [String],
  address: addressSchema,
})

//creating instance method

UserSchema.methods.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId })
  return existingUser
}

export const User = model<TUser, UserModel>('User', UserSchema)
