  import CredentialsProvider from "next-auth/providers/credentials"
  import { NextAuthOptions } from "next-auth"
  import bcrypt from "bcryptjs"
  import dbConnect from "@/lib/dbConnect"
  import { userModel } from "@/model/User"
  import { JWT } from "next-auth/jwt"
  import { DefaultSession } from "next-auth"

  export const authOptions : NextAuthOptions={
    //adds how i want my user to login with
      providers : [
          CredentialsProvider({
              id:"Credentials",
              name:"Credentials",
              credentials: {
                identifier: { label: "Email or Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
              },
              async authorize(credentials,any): Promise<any>{ 
                  await dbConnect()
                    try {
                    const user = await userModel.findOne({
                            $or:[
                              {email:credentials?.identifier},
                              {username:credentials?.identifier},
                            ]  
                      })
                      if(!user){
                          throw new Error('no user found with this email')
                      }
                      if(!user.isVerified){
                          throw new Error('please login first')
                      }
                      if (!credentials?.identifier || !credentials.password) {
                        throw new Error("Missing credentials")
                      }
                      const isPasswordCorrect = await bcrypt.compare(credentials.password , user.password)
                      if(isPasswordCorrect){
                        return user
                      } else{
                        throw new Error(' incorrect password ')
                      }
                    } catch (error:any) {
                      throw new Error(error || 'something went wrong')
                    }
              }
          })
          
      
        ],
        callbacks:{
            async session ({session  ,token}){
              if(token){
                session.user._id = token._id
                session.user.isVerified = token.isVerified
                session.user.isAcceptingMessages = token
              }
              return session
            },
            async jwt({token,user}) {
              if(user){
                token._id = user._id?.toString()
                token.isVerified = user.isVerified;
                token.isAcceptingMessages = user.isAcceptingMessages;
                token.username=user.username;
              }            
              return token             
            },

        },
        //routes , nextauth does it by itself ie the page i dont need to work
        pages: {
          signIn : '/signIn',
         

        },

        session : {
          strategy:"jwt"
        },
        secret: process.env.NEXTAUTH_SECRET,


  }