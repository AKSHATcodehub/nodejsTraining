import mongoose from "mongoose";

const media_list = new mongoose.Schema({
    img_url:{type:String}
})

const PostSchema = new mongoose.Schema({
    post_id:{type:mongoose.Schema.Types.ObjectId},
    user_id:{type:mongoose.Schema.Types.ObjectId},
    caption:{type:String},
    likes:[{types:mongoose.Schema.Types.ObjectId,ref:"'User"}],
    like_count:{type:Number},
    comment:[{types:mongoose.Schema.Types.ObjectId , ref:"Comment"}],
    comment_count:{type:Number},
    media_url:[{type:media_list}]

})

const commenModel = mongoose.model("Post",PostSchema)