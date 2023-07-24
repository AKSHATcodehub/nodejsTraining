import { Router } from "express"
import { likeController } from "../controllers/likes/like.controller"


class LikeRoutes{

    router = Router()
    constructor(){
        this.intializeRoutes()
    }

    intializeRoutes(){
        this.router.get('/like',likeController.getLikesOnPost)
        this.router.post('/like',likeController.createLikeOnPost)

    }

}

export const likeRoutes = new LikeRoutes().router