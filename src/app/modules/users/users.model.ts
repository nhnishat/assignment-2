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
    required: [true, 'First Name is required'],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
  },
})
const addressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: [true, 'Address is required'],
  },
  city: {
    type: String,
    required: [true, 'City is required'],
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
  },
})
const orderSchema = new Schema<TOrder>([
  {
    productName: {
      type: String,
      required: [true, 'Product address is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
    },
  },
])
const UserSchema = new Schema<TUser, UserModel>({
  userId: {
    type: Number,
    trim: true,
    required: [true, 'userId is required'],
  },
  username: {
    type: String,
    trim: true,
    required: [true, 'User Name is required'],
  },
  password: { type: String, required: [true, 'Password is required'] },
  fullName: fullNameSchema,
  age: { type: String, trim: true, required: [true, 'Age is required'] },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
  },
  isActive: { type: Boolean, required: [true, 'isActive is required'] },
  hobbies: [String, [true, 'Hobbies is required']],
  address: addressSchema,
  orders: orderSchema,
})

UserSchema.pre('save', async function (next) {
  const user = this
  user.password = await bcrypt.hash(user.password, 10)
  next()
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
