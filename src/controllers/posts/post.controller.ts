import { Request, Response } from "express";
import { postModel } from "./post.model";

interface CustomRequest extends Request{
    user_id:string
}
class PostClass{

    constructor(){}

    async getAllPost(req:any,res:Response){
        try{

            
            console.log(">>>>>>>>>>>>>>>>",req.user_id)
            const posts = await postModel.find({post_id:req.body.post_id})
            
            const post = await postModel.aggregate(
                
                [   
                    {
                        $match:{ post_id:Number(req.body.post_id)}
                    },
                    // {
                    //     $unwind:"$users_likes"
                    // },
                    // {
                    //     $lookup:
                    //     {
                    //       from: 'users',
                    //       localField: 'users_likes',
                    //       foreignField: 'user_id',
                    //       as: 'users_likes'
                    //     }
                    // },
                    // // {
                    // //     $group:{_id:"$post_id",post:{$push:"$$ROOT"}}
                    // // }
                    // {
                    //     $addFields: {
                    //         users_likes: '$users_likes' // Keep the 'books' field as the joined result (overwrite the original 'books' array)
                    //       }
                    // },
                    // {
                    //     $lookup:
                    //     {
                    //       from: 'comments',
                    //       localField: 'users_comment',
                    //       foreignField: 'user_id',
                    //       as: 'users_comment'
                    //     }
                    // },
                    // {
                    //     $addFields: {
                    //         users_comment: '$users_comment' // Keep the 'books' field as the joined result (overwrite the original 'books' array)
                    //       }
                    // },
                ]
                )
                
                console.log("::::::::::::::::::::::::::::::",post)
                res.send(post)


        }catch(err){
            res.send(err)
        }
    }

    async createPost(req:Request,res:Response){
        try{

            const {post_id,user_id,caption,users_likes,like_count,users_comment,comment_count,media_url} = req.body;

            const post = await postModel.create({post_id,user_id,caption,users_likes,like_count,users_comment,comment_count,media_url});

            post.save()

            res.send({message:"post created sucessfully"})

        }catch(err){
            res.send({err})
        }
        
    }

}

export const postClass = new PostClass()