import {z} from 'zod'

export const MessageSchema = z.object({
    content : z.string()
    .min(10,"minimum of 10 charecters")
    .max(500,"content must be no more than 500 cahrecters")

})