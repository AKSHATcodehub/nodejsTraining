import { Request, Response } from "express"
import { commentService } from "./comment.service"

class CommentController{
    constructor(){}

    async getCommentsOnPost(req:Request,res:Response){
        await commentService.getCommentsOnPost(req,res)
    }
    
    async createCommentOnPost(req:Request,res:Response){
        await commentService.createCommentOnPost(req,res)
    }

}

export const commentController = new CommentController()