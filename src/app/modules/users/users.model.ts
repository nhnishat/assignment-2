import { Schema, model } from 'mongoose'
import { User } from './users.interface'

const UserSchema = new Schema<User>({
  userId: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  age: { type: String, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: [String],
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
})

// Create the Mongoose model
export const UserModel = model<User>('User', UserSchema)
