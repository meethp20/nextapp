import dbConnect from "@/lib/dbConnect";
import { userModel } from "@/model/User";
import bcrypt from "bcryptjs";
import { SendVerificationEmail } from "@/helpers/SendVerificationEmail";


export async function POST(request :Request){
    await dbConnect()
    try {
        const {username,email,password}=await request.json()
       const existingUserVerifiedByUsername =await userModel.findOne({
            username,
            isVerified:true
        })

    } catch (error) {
        console.error('error registering user',error)
        return Response.json(
            {
                success:false,
                message:'error registering user'
            },{
               status:500
            }
        )
    }
}