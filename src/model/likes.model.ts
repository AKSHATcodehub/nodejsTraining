import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    like_id:{type:Number},
    user_id:{type:Number},
    post_id:{type:Number}
})

const likeModel = mongoose.model('like',likeSchema)