import {z} from 'zod'

export const VerifySchema = z.object({
    email: z.string().email({message:"invalid email address"}),
    password : z.string(),
})