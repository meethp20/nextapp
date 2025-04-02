import CredentialsProvider from "next-auth/providers/credentials"
import { NextAuthOptions } from "next-auth"
import bcrypt from "bcryptjs"
import dbConnect from "@/lib/dbConnect"
import { userModel } from "@/model/User"

export const authOptions : NextAuthOptions={
    providers : [
        CredentialsProvider({
            id:"Credentials",
            name:"Credentials",
            credentials:{
                email:{label:"username ",
                type :" type", placeholder:"jsmith"},
                password:{
                  label:"password", type:"password" }
            },
            async authorize(credentials,any): Promise<any>{ 
                await dbConnect()
                  try {
                  const user = await userModel.findOne({
                           $or:[
                            {email:Credentials.identifier},
                            {username:Credentials.identifier},
                           ]
                    })
                    if(!user){
                        throw new Error('no user found with this email')
                    }
                  } catch (error:any) {
                    throw new error(error)
                  }
            }
        })
     
    ]
}