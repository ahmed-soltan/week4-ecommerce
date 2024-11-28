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

export const reviewSchema = z.object({
    rating: z.number().min(1).max(5),
    comment: z.string().min(10),
})

export const ContactFormSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    phone: z.string().min(10),
    message: z.string().min(5).max(500),
})