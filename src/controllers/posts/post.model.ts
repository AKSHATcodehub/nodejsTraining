import mongoose from "mongoose";
const { Schema } = mongoose;

const media_list = new Schema({
    img_url:{type:String}
})

const PostSchema = new Schema({
    post_id:{type:Number},
    user_id:{type:String},
    caption:{type:String},
    users_likes:[{type:String}],
    like_count:{type:Number},
    users_comment:[{type:String}],
    comment_count:{type:Number},
    media_url:[{type:media_list}]

})



export const postModel = mongoose.model("Post",PostSchema)