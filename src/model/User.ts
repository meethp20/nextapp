import mongoose , { Document,Schema} from 'mongoose'

export interface Message extends Document{
    content : String,
    createdAt:Date,
}

const MessageSchema = new Schema<Message>({
    content: { 
        type:String,
        required :true,
    },
    createdAt:{
        type:Date,
        deafault:Date.now,
    }
})

export interface User extends Document {
    email:string,
    password:string,
    username:string,
    verifyCode:string,
    verifyCodeExpire:Date,
    isVerified:boolean,
    isAcceptingMessage:boolean,
    messages:Message[],

}

const UserSchema = new Schema<User>({
    email:{
        type:String,
        required:[true,'email is neccesary'],
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:[true,'username is neccesary'],
        unique:true,
        match : [ /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'please use a valid email address' ]
    },
    verifyCode:{
        type:String,
        required:true,
    },
    verifyCodeExpire:{
        type:Date,
        required:true,
    },
    isVerified:{
        type:Boolean,
        default:false,
    },  
    isAcceptingMessage:{
        type:Boolean,
        default:false,
    },  
    messages:[MessageSchema],
})
 export const userModel = (mongoose.models.User  || mongoose.model<User>('User',UserSchema))
