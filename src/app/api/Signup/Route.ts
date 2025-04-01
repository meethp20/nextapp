// re read
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
        // if username is found then dont make new cause already exists
        if(existingUserVerifiedByUsername){
            return Response.json({
                success:false,
                message:"username exists"
            },{ status:400})
        }
        const verifyCode = Math.floor(100000+Math.random()*900000).toString()
      const existingUserByEmail=await userModel.findOne({email})

      if(existingUserByEmail){ 
         if(existingUserByEmail.isVerified){
             return Response.json({
                sucess:false,
                message:"user already exists with this email"
            },{status: 400})
             }else{
                const hashedPassword =await bcrypt.hash(password,10)
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode= verifyCode;
                existingUserByEmail.verifyCodeExpire= new
                Date(Date.now()+3600000)
             }
      }else{
        const hashedPassword = await bcrypt.hash(password,10)
        const expiryDate= new Date()
        expiryDate.setHours(expiryDate.getHours()+1)
        // creating new user
     const newUser =  new userModel({
             email,
                password: hashedPassword,
                username,
                verifyCode,
                verifyCodeExpire:expiryDate,
                isVerified:false,
                isAcceptingMessage:true,
                messages:[],
            
        })
        await newUser.save()
      }

      // sending verification email
      const emailResponse = await SendVerificationEmail(
        email,
        username,
        verifyCode
      )
      if(!emailResponse.success){
        return Response.json({
            sucess:false,
            message:"username is already taken"
        },{status: 500})
      }
      return Response.json({
        sucess:true,
        message:"user registered succesfully .please verify your email"
    },{status: 500})
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