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
  userId: string
  username: string
  password: string
  fullName: TFullName
  age: string
  email: string
  isActive: boolean
  hobbies: [string, string]
  address: TAddress
}
