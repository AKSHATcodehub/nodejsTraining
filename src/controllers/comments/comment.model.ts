import mongoose from "mongoose";
const { Schema } = mongoose;

const CommentSchema = new Schema({
    post_id:{type:Number},
    user_id:{type:Number},
    comments:[{type:String}]
})

export const commentModel = mongoose.model("Comment",CommentSchema)