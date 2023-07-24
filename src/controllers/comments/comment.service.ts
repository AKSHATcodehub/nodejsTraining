import { Request, Response } from "express"
import { commentModel } from "./comment.model"


class CommentService{

    async getCommentsOnPost(req:Request,res:Response){
        const comment = await commentModel.aggregate([
            {
                $match:{post_id:Number(req.body.post_id)}
            },
            {

                $lookup:{
                    from:'users',
                    localField:'user_id',
                    foreignField:'user_id',
                    as:'list_of_commented_user_details'
                }
            },
            {
                $project:{
                    'list_of_commented_user_details._id':0,
                    'list_of_commented_user_details.user_id':0,
                    'list_of_commented_user_details.email':0,
                    'list_of_commented_user_details.password':0
                }
            }
        ])
        res.send(comment)
    }

    async createCommentOnPost(req:Request,res:Response){

        const {post_id,user_id,comments} = req.body

        const comment = await commentModel.create({
            post_id,user_id,comments
        })
        res.send({message:"commet created"})
    }
}

export const commentService = new CommentService()