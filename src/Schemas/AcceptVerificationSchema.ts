import {z} from 'zod'

export const AcceptVerificationSchema = z.object({
    acceptMessages:z.boolean(),
})