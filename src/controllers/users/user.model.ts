import mongoose from "mongoose";
import joi from "joi";
const { Schema } = mongoose;

const userProfile = new Schema({
    name:{type:String},
    bio:{type:String},
    post_count:{type:Number},
    follwer_count:{type:String},
    followed_count:{type:String}
})

const userSchema = new Schema({
    user_id: {type:Number},
    email:{type:String},
    password:{type:String},
    profile:{type:userProfile}
})

const sessionSchema = new Schema({
    user_id:{type:String},
    session_id:{type:String},
    device_type:{type:String},
    device_id:{type:String}
})

export const userModel = mongoose.model('User',userSchema)

export const sessionModel = mongoose.model('Session',sessionSchema)