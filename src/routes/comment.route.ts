import { Router } from "express";
import { commentController } from "../controllers/comments/comment.controller";
import { verifyUser } from "../middleware/userauth.middleware";

class CommentRoute{
    router = Router();
    constructor(){
        this.intializeRoutes()
    }

    intializeRoutes(){
        this.router.get('/comment',verifyUser,commentController.getCommentsOnPost)
        this.router.post('/comment',verifyUser,commentController.createCommentOnPost)
        this.router.delete('/comment',verifyUser,commentController.createCommentOnPost)
    }
}

export const commentRoutes = new CommentRoute().router;