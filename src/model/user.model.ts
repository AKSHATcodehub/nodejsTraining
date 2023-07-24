import mongoose from "mongoose";

const userProfile = new mongoose.Schema({
    name:{type:String},
    bio:{type:String},
    post_count:{type:Number},
    follwer_count:{type:String},
    followed_count:{type:String}
})

const userSchema = new mongoose.Schema({
    user_id: {type:Number},
    email:{type:String},
    password:{type:String},
    profile:{type:[userProfile]}
})

const userModel = mongoose.model('user',userSchema)