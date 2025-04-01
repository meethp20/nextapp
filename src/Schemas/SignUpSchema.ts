import {z} from 'zod'

export const usernameValidation = z
.string()
.min(2,"username must be atlead two charecters")
.max(20,"must be no more than 20 charecters")
.regex( /^[a-zA-Z0-9]+$/, "shouldnt contain special charecters")


export const SignUpSchema = z.object({
   username : usernameValidation,
   email : z.string().email({message:"invalid email address"}),
   password: z.string().min(6,"password must be atleast 6 charecters")
})