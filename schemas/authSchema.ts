import { z } from 'zod'

export const emailSchema = z.object({
  email: z
    .string({
      required_error: "Can't be empty"
    })
    .email({ message: 'Must be a valid email' })
})

export const passwordSchema = z.object({
  password: z
    .string({
      required_error: "Can't be empty"
    })
    .min(8, { message: 'Must be at least 8 characters long' })
})

export const repeatPasswordSchema = z.object({
  repeatPassword: z
    .string({
      required_error: "Can't be empty"
    })
    .min(8, { message: 'Must be at least 8 characters long' })
})
