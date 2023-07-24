import mongoose from "mongoose";

const HashtagOnPostSchema = new mongoose.Schema({
    post_id:{type:mongoose.Schema.Types.ObjectId,ref:"Post"},
    hashtag_id:{type:mongoose.Schema.Types.ObjectId,ref:"Hashtag"}
})

const hashtagModel = mongoose.model("Hashtagonpost",HashtagOnPostSchema)