import mongoose from "mongoose";
const { Schema } = mongoose;
const likeSchema = new Schema({
    users_id:[{type:Number}],
    post_id:{type:Number}
})

export const likeModel = mongoose.model('like',likeSchema)