import bcrypt from 'bcrypt'
import { Schema, model } from 'mongoose'

import {
  TAddress,
  TFullName,
  TOrder,
  TUser,
  UserModel,
} from './users.interface'
const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
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
const orderSchema = new Schema<TOrder>([
  {
    productName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
])
const UserSchema = new Schema<TUser, UserModel>({
  userId: { type: String, trim: true, required: true },
  username: { type: String, trim: true, required: true },
  password: { type: String, required: true },
  fullName: fullNameSchema,
  age: { type: String, trim: true, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  isActive: { type: Boolean, required: true },
  hobbies: [String],
  address: addressSchema,
  orders: orderSchema,
})

UserSchema.pre('save', async function (next) {
  const user = this
  if (this.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10)
    this.password = undefined as unknown as string
  }
})

UserSchema.methods.toJSON = function () {
  const userObject = this.toObject()
  delete userObject.password
  return userObject
}

UserSchema.statics.isUserExists = async function (userId: string) {
  const isExistsUser = await User.findOne({ userId })
  return isExistsUser
}

export const User = model<TUser, UserModel>('User', UserSchema)
