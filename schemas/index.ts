import * as z from 'zod'

export const LoginSchema= z.object({
    email: z.string().email(),
    password: z.string().min(1 , {
        message:"Password is Required"
    }),
    code:z.optional(z.string())
})

export const RegisterSchema= z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
})
export const NewPasswordSchema= z.object({
    password: z.string().min(6),
})

export const ResetSchema = z.object({
    email: z.string().email()
})