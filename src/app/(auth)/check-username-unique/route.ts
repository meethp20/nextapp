import dbConnect from "@/lib/dbConnect";
import { userModel } from "@/model/User";
import {z} from "zod";
import { usernameValidation } from "@/Schemas/SignUpSchema";
import { responseCookiesToRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

const usernameQueryuSchema = z.object({
    username: usernameValidation,

})
export async function GET(request:Request){
    await dbConnect()

    try{ 
          const{searchParams} = new URL(request.url)
          const queryParams = {
            username: searchParams.get('username')
          }
    }catch(error){
    console.log("error checking username",error)
    return Response.json({
        success:false,
        message:"error checking username"
    },
    {status:500})
    }
} 