import { z } from 'zod'

const FullNameSchema = z.object({
  firstName: z
    .string()
    .trim()
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    })
    .refine((value) => value.length > 0, {
      message: 'First name must not be empty',
    }),

  lastName: z
    .string()
    .trim()
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    })
    .refine((value) => value.length > 0, {
      message: 'First name must not be empty',
    }),
})

const AddressSchema = z.object({
  street: z.string().min(1, { message: 'Street must not be empty' }),
  city: z.string().min(1, { message: 'City must not be empty' }),
  country: z.string().min(1, { message: 'Country must not be empty' }),
})
const orderSchema = z.object({
  productName: z.string().min(1, { message: 'Country must not be empty' }),
  price: z.number().min(1, { message: 'Country must not be empty' }),
  quantity: z.number().min(1, { message: 'Country must not be empty' }),
})

const validationUserSchema = z.object({
  userId: z.string().min(1, { message: 'User ID must not be empty' }),
  username: z.string().min(1, { message: 'Username must not be empty' }),
  password: z.string().min(1, { message: 'Password must not be empty' }),
  fullName: FullNameSchema,
  age: z.string().min(1, { message: 'Age must not be empty' }),
  email: z.string().email({ message: 'Invalid email address' }),
  isActive: z.boolean(),
  hobbies: z.tuple([z.string(), z.string()]),
  address: AddressSchema,
  orders: orderSchema,
})
export default validationUserSchema
