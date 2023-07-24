import mongoose from "mongoose";

const HashtagSchema = new mongoose.Schema({
    hashtag_id:{type:mongoose.Schema.Types.ObjectId},
    hashtag_text:{type:String}
})

const hashtagModel = mongoose.model("Hashtag",HashtagSchema)