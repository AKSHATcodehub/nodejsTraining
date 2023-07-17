import mongoose from "mongoose";

const tags = new mongoose.Schema({
    name:{
        type:String
    },

    user_id:{

    }
});


const post = new mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },

    image:{
        type:String
    },
    tags:tags[],

    description:{
        type:String
    },
    likes:{
        type:Number
    },
    comments:{
        type:Number
    },
})

const postData = mongoose.model('User' , post)

const likes = new mongoose.Schema({
    post_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post' 
    },

    like_count:{
        type:Number
    },

});


const likesdata = mongoose.model('Users' , likes)


const user = new mongoose.Schema({
    name:{
        type:String
    },
    username:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    Bio:{
        type:String
    },
    followerList:{
        type:Number
    },
    followingList:{
        type:Number
    }
})

const userData = mongoose.model('instagramUsers' , user)


const comment_reply = new mongoose.Schema({
    user_id:{
        type:String
    },

    reply_desc:{
        type:String
    },
    reply_likes:{
        type:String
    }

}) 

const comment = new mongoose.Schema({
    post_id:{
        type:Number
    },

    user_id:{
        type:String
    },

    comment_description:{
        type:String
    },

    comment_reply:comment_reply,
    
    comment_likes:{
        type:Number
    }

});


const commentData = mongoose.model('Users' , comment)



const action = new mongoose.Schema({
    likes:{
        ref:'likes'
    },

    comments:{
        ref:'comment'
    }
});

const actions = mongoose.model('Users' , action)










