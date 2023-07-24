import { Request, Response } from "express";
import { likeModel } from "./like.model";


class LikeController{

    async getLikesOnPost(req:Request,res:Response){

        const { user_id,post_id} = req.body;

        const likes = await likeModel.aggregate(
            [   
                {
                    $match:{post_id:post_id}
                },
                {
                    $lookup:
                        {
                            from: 'users',
                            localField: 'users_id',
                            foreignField: 'user_id',
                            as: 'list_of_users_likes'
                        }
                },
                {
                    $project:
                        {
                            users_id:0,
                            'list_of_users_likes._id':0,
                            'list_of_users_likes.user_id':0,
                            'list_of_users_likes.email':0,
                            'list_of_users_likes.password':0,
                            
                        }
                }
            ]
        )

        res.send(likes)
    }

    async createLikeOnPost(req:Request,res:Response){

        const { users_id,post_id,user_id} = req.body;

        
        const like = await likeModel.find({post_id:req.body.post_id})

        // const like = await likeModel.aggregate([
        //     {
        //         $match:{post_id:post_id}
        //     },
        //     {
        //         $unwind:{ path:"$users_id"}
        //     }
        // ])

        // console.log("hyy>>>>>>>>",like)
       

        if(like.length!=0){

            let user_likes = [...like[0]?.users_id,...user_id]
            
            console.log(user_likes)

            like[0].users_id = user_likes

            await like[0].save();

            res.send(like)
        }else{

            console.log(" else block ");
            

            let create_like_payload = {
                post_id:post_id,
                users_id:user_id
            }
             
            const created_like = await likeModel.create(create_like_payload)
            created_like.save();

            res.send(created_like)
        }

        
    }
}

export const likeController = new LikeController(); 