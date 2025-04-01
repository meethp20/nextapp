import { resend } from "@/lib/Resend";

import { ApiResponse } from "../../types/Apiresponse";
import VerificationEmail from "../../emails/VerificationEmail";

export async function SendVerificationEmail(
email:string,
username:string,
verifyCode:string
) :Promise<ApiResponse>
{
    try {
        await resend.emails.send({
            from: ' <onboarding@resend.dev>',
            to: email,
             subject: 'nextapp verification code',
            react: VerificationEmail({username,otp:verifyCode}),

          });
        return {success:true,message:
            'email verification successfully sent'
        }
    } catch (error) {
        console.log("error sending verification email", error)
        return {success:false ,message:'failed to send verification email' }
    }
}