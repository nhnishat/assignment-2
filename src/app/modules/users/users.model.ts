import { Model, Schema, model } from 'mongoose'
import { TAddress, TFullName, TUser } from './users.interface'
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
})

export interface UserModel extends Model<TUser> {
  isUserExists(userId: string): Promise<TUser | null>
}

UserSchema.statics.isUserExists = async function (userId: string) {
  const isExistsUser = await User.findOne({ userId })
  return isExistsUser
}

export const User = model<TUser, UserModel>('User', UserSchema)
